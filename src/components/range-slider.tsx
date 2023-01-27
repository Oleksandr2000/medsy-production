import { useFilter } from "contexts/filter/filter.provider";
import { useDarkTheme } from "helpers/use-darkTheme";
import React, { useEffect } from "react";
import { getTrackBackground, Range } from "react-range";
import Input from "./input";

export interface ITwoThumbsRangepRrops {
  values: number[];
  setValues: (values: number[]) => void;
}

const TwoThumbsRange = ({ values, setValues }: ITwoThumbsRangepRrops) => {
  const { maxPrice, minPrice } = useFilter();

  const MIN = minPrice;
  const MAX = maxPrice;
  const isDark = useDarkTheme();

  const validationInputMax = (value: number, min: number, max: number) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min + 1;
    } else {
      return value;
    }
  };

  const validationInputMin = (
    value: number,
    min: number,
    currentMaxValue: number
  ) => {
    if (value > currentMaxValue) {
      return currentMaxValue - 1;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  return (
    <div className="my-5">
      <div className="mb-5 flex flex-row items-center justify-between font-normal text-16px text-gray-500">
        <input
          type="number"
          placeholder="Min price"
          value={values[0]}
          min={MIN}
          max={MAX}
          className="h-12 px-4 w-2/5 placeholder-gray-500 border border-transparent rounded outline-none transition duration-200 'text-gray-900 bg-gray-f7 dark:focus:placeholder-gray-500 dark:bg-slate-600 dark:text-gray-400 dark:placeholder:gray-400 hover:border-gray-400 focus:border-black focus:placeholder-gray-900"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValues([
              validationInputMin(Number(e.target.value), 0, values[1]),
              values[1],
            ]);
          }}
        />
        <input
          type="number"
          placeholder="Max price"
          value={values[1]}
          min={MIN}
          max={MAX}
          className="h-12 px-4 w-2/5 placeholder-gray-500 border border-transparent rounded outline-none transition duration-200 'text-gray-900 bg-gray-f7 dark:focus:placeholder-gray-500 dark:bg-slate-600 dark:text-gray-400 dark:placeholder:gray-400 hover:border-gray-400 focus:border-black focus:placeholder-gray-900"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValues([
              values[0],
              validationInputMax(
                Number(e.target.value),
                values[0],
                Number(e.target.max)
              ),
            ]);
          }}
        />
      </div>
      <Range
        values={values}
        min={MIN}
        max={MAX}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "20px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "4px",
                width: "100%",
                margin: "0 12px",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: isDark ? ["#475569", "#475569", "#475569"] : ["#ccc", "#ccc", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "22px",
              width: "22px",
              borderRadius: "100%",
              backgroundColor: isDark ? "#D5D5D5" : "#212121",
            }}
          />
        )}
      />
    </div>
  );
};

export default TwoThumbsRange;
