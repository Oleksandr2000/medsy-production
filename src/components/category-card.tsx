import React, { ReactElement, useState } from "react";
import Image from "next/image";
import { useCategory } from "contexts/category/use-category";
import Sceleton from "../components/category-sceleton";

interface Props {
  imageUrl: string;
  name: string;
  id: string;
  parentId: string;
}

export default function CategoryCard({
  imageUrl,
  name,
  id,
  parentId,
}: Props): ReactElement {
  const { category, setCategory } = useCategory();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  function handleCategoryClick() {
    setCategory({ id: id, parentId: parentId, name: name });
  }

  if (isLoading) {
    return <Sceleton />;
  }

  return (
    <div
      className="p-4 flex flex-col border rounded-md text-center border-gray-300 dark:border-gray-800"
      onClick={handleCategoryClick}
      role="button"
    >
      <Image
        src={imageUrl ?? "/"}
        alt={name}
        width={120}
        height={120}
        unoptimized
      />
      <p className="font-semibold text-gray-900 truncate dark:text-gray-400">
        {name}
      </p>
    </div>
  );
}
