import React, { ReactElement, useRef, useState } from "react";
import Image from "next/image";
import { useCategory } from "contexts/category/use-category";

interface Props {
    imageUrl: string;
    name: string;
    id: string;
    parentId: string;
    imgSize: number;
}

export default function CategoryCard({ imageUrl, name, id, parentId, imgSize }: Props): ReactElement {
    const { setCategory } = useCategory();

    function handleCategoryClick() {
        setCategory({ id: id, parentId: parentId, name: name });
    }

    return (
        <div className="mx-auto flex flex-col text-center" onClick={handleCategoryClick} role="button">
            <Image
                id="category-img"
                src={imageUrl ?? "/"}
                alt={name}
                width={imgSize}
                height={imgSize}
                layout="fixed"
                className="rounded-lg"
            />
            <span className="overflow-hidden">
                <span className="m-0 px-0 pt-2 font-semibold text-gray-900 dark:text-gray-400">{name}</span>
            </span>
        </div>
    );
}
