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
    const [size, setSize] = React.useState({ clientHeight: 90, clientWidth: 90 });

    function handleCategoryClick() {
        setCategory({ id: id, parentId: parentId, name: name });
    }
    const ref = React.useRef();

    const resizeHandler = () => {
        const { clientHeight, clientWidth } = ref.current || { clientHeight: 90, clientWidth: 90 };
        setSize({ clientHeight, clientWidth });
    };

    React.useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    const sideLength = size.clientWidth;

    return (
        <div ref={ref} className="mx-auto flex flex-col text-center" onClick={handleCategoryClick} role="button">
            <Image
                id="category-img"
                src={imageUrl ?? "/"}
                alt={name}
                width={sideLength}
                height={sideLength}
                layout="fixed"
                className="rounded-lg"
            />
            <span className="overflow-hidden">
                <span className="m-0 px-0 pt-2 font-semibold text-gray-900 dark:text-gray-400">{name}</span>
            </span>
        </div>
    );
}
