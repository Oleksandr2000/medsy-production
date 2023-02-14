import React, { useContext, useEffect } from "react";

import ArrowLeft from "assets/icons/arrow-left";

import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useFilter } from "contexts/filter/filter.provider";
import FilrerDashboard from "containers/drawer/views/filrer-dashboard";
import { useLocalization } from "contexts/localization/localization.provider";
import { useCategory } from "../../../contexts/category/use-category";
import RightChevron from "../../../components/right-chevron";
import Breadcrumbs from "../../../components/breadcrumbs";

export default function DrawerMenu() {
    const { dispatch } = useContext(DrawerContext);
    const {
        quantityFiltredProducts,
        applyFiltersQuantity,
        setActiveFilters,
        setRangePrice,
        minPrice,
        maxPrice,
        setAvailable,
        setData,
    } = useFilter();
    const { category, categories, setCategory } = useCategory();
    const { localization } = useLocalization();
    console.log(category);
    function handleCategoryClick(id, parentId, name) {
        setCategory({ id: id, parentId: parentId, name: name });
    }

    const currentFilters =
        category.id !== "" ? categories.filter((item) => item.id === category.id)[0].filters : undefined;

    const currentCategories =
        category.id !== ""
            ? categories.filter((item) => item.parent_id === category.id)
            : categories.filter((item) => item.parent_id === "");

    useEffect(() => {
        setData(currentFilters);
    }, [category.id]);

    const clearAll = () => {
        setActiveFilters(null);

        setRangePrice([minPrice, maxPrice]);

        setAvailable(false);
    };

    const hideMenu = () => {
        dispatch({
            type: "OPEN_MENU",
            payload: {
                menu: false,
            },
        });
    };

    return (
        <>
            <div className="flex h-full w-full flex-col bg-gray-100 dark:bg-darkTheme-bg">
                <div className="flex h-90px  w-full flex-shrink-0 items-center justify-between px-30px">
                    <div className="flex items-center justify-start">
                        <button
                            className="flex h-10 w-auto items-center justify-center text-gray-500 transition duration-300 hover:text-gray-900 focus:outline-none dark:hover:text-gray-700"
                            onClick={hideMenu}
                            aria-label="close"
                        >
                            <ArrowLeft />
                        </button>
                        <div className="ml-5">
                            <h3 className="text-21px dark:text-gray-400">{localization.filterTitle}</h3>
                            <span className="text-14px text-gray-500 dark:text-gray-600">
                                Selected: {applyFiltersQuantity}
                            </span>
                        </div>
                    </div>
                    <button onClick={clearAll} className="rounded bg-error px-6 py-1 text-14px text-gray-50">
                        {localization.filterClear}
                    </button>
                </div>

                <div className="flex-grow overflow-auto">
                    <div className="flex flex-col py-5 px-10">
                        {category.name !== "" ? (
                            <h4 className="pb-4 text-18px font-normal text-dark dark:text-gray-400">
                                {localization.category}: <span className="font-semibold">{category.name}</span>
                            </h4>
                        ) : (
                            <h4 className="pb-4 text-18px font-semibold text-dark dark:text-gray-400">
                                {localization.chooseCategory}
                            </h4>
                        )}
                        <Breadcrumbs categories={categories} />
                        <div>
                            {currentCategories?.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="flex items-center justify-between py-2 first:mt-2"
                                    onClick={() => handleCategoryClick(cat.id, cat.parent_id, cat.name)}
                                >
                                    <p className="block cursor-pointer text-16px font-medium text-gray-600 dark:text-gray-500">
                                        {cat.name}
                                    </p>
                                    <RightChevron />
                                </div>
                            ))}
                        </div>
                        <FilrerDashboard />
                    </div>
                </div>

                <button className="w-full bg-green py-1 font-bold hover:bg-green hover:opacity-90" onClick={hideMenu}>
                    <span className="text-16px font-medium text-gray-300">{localization.filterShow}</span>
                    <br />
                    <span className="text-14px font-medium text-gray-300">
                        {localization.filterFounded}: {quantityFiltredProducts}
                    </span>
                </button>
            </div>
        </>
    );
}
