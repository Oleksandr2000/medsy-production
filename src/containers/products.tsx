import React, { useContext, useEffect } from "react";
import ItemCard from "components/item-card";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useSearch } from "contexts/search/search.provider";
import { useSearchable } from "helpers/use-searchable";
import NotFound from "assets/icons/not-found";
import { useCategory } from "contexts/category/use-category";
import { useFilter } from "contexts/filter/filter.provider";
import { useLocalization } from "contexts/localization/localization.provider";

const Products = React.forwardRef(
  ({ items }: any, ref: React.RefObject<HTMLDivElement>) => {
    const { dispatch } = useContext(DrawerContext);
    const { searchTerm } = useSearch();
    const { category } = useCategory();
    const { rangePrice, sort, activeFilters } = useFilter();

    const {localization} = useLocalization();

    const { filtredProducts, filtredProductsCount } = useSearchable(
      items,
      category.id,
      searchTerm,
      (item) => [item.name],
      activeFilters,
      rangePrice,
      sort?.value?.field || "name",
      sort?.value?.value || 1
    );

    const { setQuantityFiltredProducts } = useFilter();

    useEffect(() => {
      setQuantityFiltredProducts(filtredProductsCount);
    }, [filtredProducts]);

    const showDetails = (item) => {
      dispatch({
        type: "STORE_PRODUCT_DETAIL",
        payload: {
          item: item,
        },
      });

      dispatch({
        type: "SLIDE_CART",
        payload: {
          open: true,
        },
      });

      dispatch({
        type: "TOGGLE_PRODUCT_DETAIL",
        payload: {
          showDetails: true,
        },
      });
    };

    return (
      <div className="w-full py-10" ref={ref} id="myScrollToElement">
        {filtredProducts.length ? (
          <div className="grid  grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-10 xxl:grid-cols-5 xxl:gap-x-4 xxl:gap-y-12 2xxl:grid-cols-7 2xxl:gap-x-5 2xxl:gap-y-12">
            {filtredProducts.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => showDetails(item)}
              />
            ))}
          </div>
        ) : (
          <div className="pt-10px md:pt-40px lg:pt-20px pb-40px">
            <NotFound width="100%" />
            <h3 className="text-24px text-gray-900 font-bold mt-35px mb-0 text-center dark:text-gray-400">
              {localization.noItems}
            </h3>
          </div>
        )}
      </div>
    );
  }
);

export default Products;
