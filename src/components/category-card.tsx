import React, { ReactElement, useRef } from "react";
import Image from "next/image";
import { useCategory } from "contexts/category/use-category";

interface Props {
    imageUrl: string;
    name: string;
    id: string;
    parentId: string;
}

export default function CategoryCard({ imageUrl, name, id, parentId }: Props): ReactElement {
    const { setCategory } = useCategory();

    function handleCategoryClick() {
        setCategory({ id: id, parentId: parentId, name: name });
    }

    let img;

    if (typeof document !== "undefined" && typeof window !== "undefined") {
        img = document.getElementById("category-img");
    }

    const innerHeight = img?.width ? img.width : 90;

    return (
        <div className="flex flex-col text-center" onClick={handleCategoryClick} role="button">
            <Image
                id="category-img"
                src={imageUrl ?? "/"}
                alt={name}
                width={90}
                height={innerHeight}
                layout="intrinsic"
                className="rounded-lg"
            />
            <p className="truncate font-semibold text-gray-900 dark:text-gray-400">{name}</p>
        </div>
    );
}
