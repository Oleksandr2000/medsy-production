import { useCategory } from "contexts/category/use-category";
import { useLocalization } from "contexts/localization/localization.provider";
import Image from "next/image";
import React from "react";
import LeftChevron from "../../public/icons/left-chevron.svg";

const Breadcrumbs = ({ categories }) => {
  const { setCategory, category } = useCategory();

  const {localization} = useLocalization();

  if (category.id === "") {
    return null;
  }

  if (category.parentId === "") {
    return (
      <div
        className="mt-5 flex flex-row items-center cursor-pointer text-16px dark:text-gray-400"
        onClick={() =>
          setCategory({
            id: "",
            parentId: "",
            name: "",
          })
        }
      >
        <Image src={LeftChevron} width={22} height={24} />
        <div>{localization.home}</div>
      </div>
    );
  }
  const parrentCategory = categories.filter(
    (item) => item.id === category.parentId
  )[0];

  return (
    <div
      className="mt-5 flex flex-row items-center cursor-pointer text-16px dark:text-gray-400"
      onClick={() =>
        setCategory({
          id: parrentCategory.id,
          parentId: parrentCategory.parent_id,
          name: parrentCategory.name,
        })
      }
    >
      <Image src={LeftChevron} width={22} height={24} />
      <div>{parrentCategory.name}</div>
    </div>
  );
};

export default Breadcrumbs;
