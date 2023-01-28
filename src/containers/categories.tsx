import CategoryCard from "components/category-card";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/css/bundle";

import { ArrowButtonBase, ButtonGroupBase, NextButtonRadius, PrevButtonRadius } from "components/utils/theme";
import ChevronLeft from "assets/icons/chevron-left";
import ChevronRight from "assets/icons/chevron-right";
import { useCategory } from "contexts/category/use-category";
import Filters from "../components/filter-block";
import Breadcrumbs from "components/breadcrumbs";
import { useFilter } from "contexts/filter/filter.provider";
interface Props {
    data: any;
}
SwiperCore.use([Navigation]);
const breakpoints = {
    600: {
        slidesPerView: 3,
    },
    768: {
        slidesPerView: 4,
    },
    1024: {
        slidesPerView: 5,
    },
    1200: {
        slidesPerView: 6,
    },
    1400: {
        slidesPerView: 8,
    },
    1900: {
        slidesPerView: 10,
    },
};
const Categories = React.forwardRef(({ data }: Props, ref: React.RefObject<HTMLDivElement>) => {
    const { category } = useCategory();
    const { setData } = useFilter();

    const currentFilters = category.id !== "" ? data.filter((item) => item.id === category.id)[0].filters : undefined;

    const currentCategories =
        category.id !== ""
            ? data.filter((item) => item.parent_id === category.id)
            : data.filter((item) => item.parent_id === "");

    useEffect(() => {
        setData(currentFilters);
    }, [category.id]);

    return (
        <>
            <Breadcrumbs categories={data} />
            <div className="category pt-5" ref={ref}>
                <h2 className="mb-3 dark:text-gray-400">{category.name}</h2>
                {currentCategories?.length > 0 && (
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={10}
                        navigation={{
                            prevEl: ".swiper-previous-button",
                            nextEl: ".swiper-next-button",
                        }}
                        breakpoints={breakpoints}
                    >
                        {currentCategories?.map((current) => (
                            <SwiperSlide key={current.id}>
                                <CategoryCard
                                    id={current.id}
                                    parentId={current.parent_id}
                                    imageUrl={current.image_icon_url}
                                    name={current.name}
                                />
                            </SwiperSlide>
                        ))}
                        <div className={ButtonGroupBase + " " + "z-10"}>
                            <button
                                aria-label="prev-button"
                                className={ArrowButtonBase + " " + PrevButtonRadius + " " + "swiper-previous-button"}
                            >
                                <ChevronLeft height="12px" />
                            </button>
                            <button
                                aria-label="next-button"
                                className={ArrowButtonBase + " " + NextButtonRadius + " " + "swiper-next-button"}
                            >
                                <ChevronRight height="12px" />
                            </button>
                        </div>
                    </Swiper>
                )}
            </div>
            <Filters />
        </>
    );
});

export default Categories;
