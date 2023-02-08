import { useCategory } from "contexts/category/use-category";
import { useLocalization } from "contexts/localization/localization.provider";
import React from "react";
import LeftChevron from "./left-chevron";

const Breadcrumbs = ({ categories }) => {
    const { setCategory, category } = useCategory();

    const { localization } = useLocalization();

    if (category.id === "") {
        return null;
    }

    if (category.parentId === "") {
        return (
            <div
                className="flex cursor-pointer flex-row items-center text-16px text-dark dark:text-gray-400"
                onClick={() =>
                    setCategory({
                        id: "",
                        parentId: "",
                        name: "",
                    })
                }
            >
                <LeftChevron />
                <div>{localization.home}</div>
            </div>
        );
    }
    const parrentCategory = categories.filter((item) => item.id === category.parentId)[0];

    return (
        <div
            className="flex cursor-pointer flex-row items-center text-16px text-dark dark:text-gray-400"
            onClick={() =>
                setCategory({
                    id: parrentCategory.id,
                    parentId: parrentCategory.parent_id,
                    name: parrentCategory.name,
                })
            }
        >
            <LeftChevron />
            <div>{parrentCategory.name}</div>
        </div>
    );
};

export default Breadcrumbs;
