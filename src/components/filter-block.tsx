import React, { useContext } from "react";

import { useFilter } from "contexts/filter/filter.provider";
import CustomSelect from "components/select";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useLocalization } from "contexts/localization/localization.provider";

const Filters = () => {
  const { dispatch }: any = useContext(DrawerContext);
  const { sort, setSort, applyFiltersQuantity } = useFilter();
  const { localization } = useLocalization();

  const showMenu = () => {
    dispatch({
      type: "OPEN_MENU",
      payload: {
        menu: true,
      },
    });
  };

  const sortOptions = [
    {
      label: localization.sortDefault,
      value: { field: "name", value: 1 },
    },
    {
      label: localization.sortIncrement,
      value: { field: "price", value: 1 },
    },
    {
      label: localization.sortDecrement,
      value: { field: "price", value: -1 },
    },
  ];

  return (
    <div className="mt-8 flex flex-row justify-between items-center">
      <button
        className="w-[160px] flex flex-row items-center justify-between px-4 bg-white h-10 rounded-md border-gray-400 border dark:bg-dark dark:border-dark"
        onClick={showMenu}
      >
        <svg className="hidden">
          <symbol viewBox="0 0 12 11" id="filter">
            <g>
              <rect
                y="1"
                width="12"
                height="1"
                className="fill-black dark:fill-slate-400"
              />
            </g>
            <g>
              <rect
                y="5"
                width="12"
                height="1"
                className="fill-black dark:fill-slate-400"
              />
            </g>
            <g>
              <rect
                y="9"
                width="12"
                height="1"
                className="fill-black dark:fill-slate-400"
              />
            </g>
            <g>
              <circle
                cx="2.5"
                cy="1.5"
                r="1"
                className="stroke-black fill-white dark:fill-slate-900 dark:stroke-slate-400"
              />
            </g>
            <g>
              <circle
                cx="6"
                cy="5.5"
                r="1"
                className="stroke-black fill-white dark:fill-slate-900 dark:stroke-slate-400"
              />
            </g>
            <g>
              <circle
                cx="9.5"
                cy="9.5"
                r="1"
                className="stroke-black fill-white dark:fill-slate-900 dark:stroke-slate-400"
              />
            </g>
          </symbol>
        </svg>
        <svg className="w-20px h-20px">
          <use xlinkHref="#filter"></use>
        </svg>
        <div className="flex flex-row items-center">
          <div className="text-18px text-dark font-medium dark:text-gray-200">
            {localization.filterTitle}
          </div>
          <div className="bg-dark ml-2 w-6 h-6 rounded-2xl text-14px text-gray-300 dark:bg-gray-100 dark:text-dark">
            {applyFiltersQuantity}
          </div>
        </div>
      </button>
      <CustomSelect
        onChange={setSort}
        value={sort ? sort : sortOptions[0]}
        options={sortOptions}
        id="sort"
        instanceId="sort"
      />
    </div>
  );
};

export default Filters;
