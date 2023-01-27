import { useContext, useEffect, useState } from "react";

import ArrowLeft from "assets/icons/arrow-left";

import { Scrollbar } from "components/scrollbar";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useFilter } from "contexts/filter/filter.provider";
import FilrerDashboard from "containers/drawer/views/filrer-dashboard";
import { useLocalization } from "contexts/localization/localization.provider";

export default function DrawerMenu() {
  const { dispatch } = useContext(DrawerContext);
  const {
    quantityFiltredProducts,
    applyFiltersQuantity,
    setActiveFilters,
    setRangePrice,
    minPrice,
    maxPrice,
  } = useFilter();

  const { localization } = useLocalization();

  const clearAll = () => {
    setActiveFilters(null);

    setRangePrice([minPrice, maxPrice]);
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
      <div className="flex flex-col w-full h-full bg-gray-100 dark:bg-darkTheme-bg">
        <div className="w-full h-90px  flex justify-between items-center px-30px flex-shrink-0">
          <div className="flex items-center justify-start">
            <button
              className="w-auto h-10 flex items-center justify-center text-gray-500 transition duration-300 focus:outline-none hover:text-gray-900 dark:hover:text-gray-700"
              onClick={hideMenu}
              aria-label="close"
            >
              <ArrowLeft />
            </button>
            <div className="ml-5">
              <h3 className="text-21px dark:text-gray-400">
                {localization.filterTitle}
              </h3>
              <span className="text-14px text-gray-500 dark:text-gray-600">
                Selected: {applyFiltersQuantity}
              </span>
            </div>
          </div>
          <button
            onClick={clearAll}
            className="bg-error text-gray-50 text-14px px-6 py-1 rounded"
          >
            {localization.filterClear}
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow">
          <div className="flex flex-col py-5">
            <FilrerDashboard />
          </div>
        </Scrollbar>

        <button className="w-full py-1 bg-green font-bold hover:bg-green hover:opacity-90" onClick={hideMenu}>
          <span className="text-gray-300 text-16px font-medium">
            {localization.filterShow}
          </span>
          <br />
          <span className="text-gray-300 text-14px font-medium">
            {localization.filterFounded}: {quantityFiltredProducts}
          </span>
        </button>
      </div>
    </>
  );
}
