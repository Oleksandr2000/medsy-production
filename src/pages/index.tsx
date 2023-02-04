import { useEffect } from "react";
import Head from "next/head";
import Layout from "containers/layout/layout";
import Products from "containers/products";
import { useRefScroll } from "helpers/use-ref-scroll";
import { useSearch } from "contexts/search/search.provider";
import { getDataSheet } from "helpers/get-data";
import Categories from "containers/categories";
import { getPersonalData } from "helpers/get-personal-data";
import { GetServerSideProps } from "next";
import { useAdmin } from "contexts/admin/admin.provider";
import { useFilter } from "contexts/filter/filter.provider";
import { useLocalization } from "contexts/localization/localization.provider";

export default function Home({ products, categories, localization, personalData, maxPrice, theme, perCategorySlide }) {
    const { elRef, scroll } = useRefScroll({
        percentOfElement: 0,
        percentOfContainer: 0,
        offsetPX: -100,
    });
    const { searchTerm } = useSearch();
    const { setPersonalData } = useAdmin();
    const { setLocalization } = useLocalization();
    const { setMaxPrice, setRangePrice, minPrice } = useFilter();

    if (typeof window !== "undefined") {
        document.documentElement.classList.add(theme);
    }

    useEffect(() => {
        setPersonalData(personalData);

        setLocalization(localization);

        setMaxPrice(maxPrice);

        setRangePrice([Number(minPrice), Number(maxPrice)]);
    }, []);

    useEffect(() => {
        if (searchTerm) return scroll();
    }, [searchTerm, scroll]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="Description" content="Put your description here." />
                <title>Store</title>
            </Head>
            <Layout>
                <Categories data={categories} perCategorySlide={perCategorySlide} />
                <Products items={products} ref={elRef} />
            </Layout>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const taskHash = context.query.taskHash;

    const response = await getPersonalData(String(taskHash));

    const data = await getDataSheet(response.task.public);

    const lang = response.task.public.lang;

    const products = data.products.filter((item) => item.lang === lang);
    const categories = data.categories.filter((item) => item.lang === lang);
    const localization = data.localization.find((item) => item.lang === lang);

    const productsWithParentCategory = products.map((item) => {
        const category_ids = [item.category_ids];

        const findParentCategory = (id) => {
            const parent = categories.find((item) => item.id == id);

            if (parent?.parent_id !== undefined) {
                category_ids.unshift(parent.parent_id);

                findParentCategory(parent.parent_id);
            }

            return;
        };

        findParentCategory(item.category_ids);

        return {
            ...item,
            category_ids,
        };
    });

    const categoriesWithFilter = categories.map((item) => {
        const categoryId = item.id;
        const params = productsWithParentCategory
            .filter((item) => item.category_ids.includes(categoryId))
            .map((item) => item.params);

        const keys = Array.from(new Set(params.map((item) => Object.keys(item)).flat()));

        const filters = {};

        keys.map((item: string) => {
            const value = [];

            params.map((obj) => {
                if (typeof obj[item] === "object" && obj[item].hasOwnProperty("value")) {
                    value.push(obj[item].value);
                }
            });

            filters[item] = {
                label: params.find((param) => param.hasOwnProperty(item))[item]["label"],
                value: Array.from(new Set(value.flat())),
            };
        });

        return {
            ...item,
            filters,
        };
    });

    const arrayPrice = products.map((item) => item.price);

    const maxPrice = Math.max.apply(null, arrayPrice);

    const theme = response.task.public.theme;

    return {
        props: {
            products: productsWithParentCategory,
            categories: categoriesWithFilter,
            localization,
            personalData: { ...response.task.public, taskHash },
            perCategorySlide: response.task.public.perCategorySlide || 4,
            maxPrice,
            theme,
        },
    };
};
