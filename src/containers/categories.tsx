import CategoryCard from "components/category-card";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/css/bundle";

import { ArrowButtonBase } from "components/utils/theme";
import ChevronLeft from "assets/icons/chevron-left";
import ChevronRight from "assets/icons/chevron-right";
import { useCategory } from "contexts/category/use-category";
import Filters from "../components/filter-block";
import Breadcrumbs from "components/breadcrumbs";
import { useFilter } from "contexts/filter/filter.provider";
interface Props {
    data: any;
    perCategorySlide: number;
}
SwiperCore.use([Navigation]);
const breakpoints = {
    425: {
        slidesPerView: 4,
    },

    600: {
        slidesPerView: 5,
    },
    768: {
        slidesPerView: 6,
    },
    1024: {
        slidesPerView: 7,
    },
    1200: {
        slidesPerView: 8,
    },
    1400: {
        slidesPerView: 9,
    },
    1900: {
        slidesPerView: 12,
    },
};
const Categories = React.forwardRef(({ data, perCategorySlide }: Props, ref: React.RefObject<HTMLDivElement>) => {
    const { category } = useCategory();
    const { setData } = useFilter();
    const [sideLength, setSideLength] = useState(90);
    const refSlide = useRef(null);

    const resizeHandler = () => {
        setSideLength(refSlide.current.clientWidth);
    };

    React.useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

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
                        slidesPerView={perCategorySlide}
                        spaceBetween={16}
                        navigation={{
                            prevEl: ".swiper-previous-button",
                            nextEl: ".swiper-next-button",
                        }}
                        breakpoints={breakpoints}
                    >
                        {currentCategories?.map((current) => (
                            <SwiperSlide key={current.id}>
                                <div ref={refSlide}>
                                    <CategoryCard
                                        id={current.id}
                                        parentId={current.parent_id}
                                        imageUrl={current.image_icon_url}
                                        name={current.name}
                                        imgSize={sideLength}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                        <div
                            style={{ top: sideLength / 2 + "px" }}
                            className={`absolute z-10 flex w-full translate-y-1/2 items-center`}
                        >
                            <button
                                aria-label="prev-button"
                                className={ArrowButtonBase + " " + "left-0 ml-[5px]" + " " + "swiper-previous-button"}
                            >
                                <ChevronLeft height="12px" />
                            </button>
                            <button
                                aria-label="next-button"
                                className={ArrowButtonBase + " " + "right-0 mr-[5px]" + " " + "swiper-next-button"}
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
