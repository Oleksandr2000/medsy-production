import React, { useEffect } from "react";
import TwoThumbsRange from "components/range-slider";
import Checkbox from "components/checkbox";
import { useFormik } from "formik";
import { useFilter } from "contexts/filter/filter.provider";
import { useLocalization } from "contexts/localization/localization.provider";

const FilrerDashboard = () => {
    const {
        setActiveFilters,
        rangePrice,
        setRangePrice,
        activeFilters,
        setApplyFiltersQuantity,
        data,
        minPrice,
        maxPrice,
        available,
        setAvailable,
    } = useFilter();

    const { localization } = useLocalization();

    let initialValues = {};

    const filtersNameArray = Object.keys(data ? data : {});

    for (let i = 0; i < filtersNameArray.length; i++) {
        initialValues[filtersNameArray[i]] = [];
    }

    const FilterForm = useFormik({
        initialValues,
        onSubmit: () => {},
    });

    const calcApplyQuantity = (filters): number => {
        let quantity = 0;

        const existFilters = Object.keys(filters);

        for (let i = 0; i < existFilters.length; i++) {
            quantity = quantity + filters[existFilters[i]].length;
        }

        return quantity;
    };

    const handleApplyFiltersQuantity = () => {
        setActiveFilters(FilterForm.values);

        let quantity = 0;

        quantity = calcApplyQuantity(FilterForm.values);

        if (rangePrice[1] < maxPrice || rangePrice[0] > minPrice) {
            quantity = quantity + 1;
        }

        if (available) {
            quantity = quantity + 1;
        }

        setApplyFiltersQuantity(quantity);
    };

    useEffect(() => {
        handleApplyFiltersQuantity();
    }, [rangePrice[0], rangePrice[1], FilterForm.values, available]);

    useEffect(() => {
        setActiveFilters(null);
    }, [data]);

    useEffect(() => {
        if (!activeFilters) {
            FilterForm.resetForm();
        }
    }, [activeFilters]);

    return (
        <div className="px-10">
            <TwoThumbsRange values={rangePrice} setValues={setRangePrice} />
            <form onSubmit={FilterForm.handleSubmit} className="w-full">
                <div className="flex flex-col items-start">
                    <div className="flex w-full flex-col">
                        <div className="mb-3">
                            <h3 className="dark:text-gray-500">{localization.available}</h3>
                        </div>
                        <Checkbox
                            type="checkbox"
                            name="available"
                            values={available}
                            label={localization.available}
                            onChange={() => setAvailable(!available)}
                        />
                    </div>
                    {data &&
                        Object.keys(data).map((key: string) => (
                            <div key={key} className="flex w-full flex-col">
                                <div className="mb-3">
                                    <h3 className="dark:text-gray-500">{data[key]["label"]}</h3>
                                </div>
                                {data[key]["value"].map((item: any) => (
                                    <Checkbox
                                        key={item}
                                        type="checkbox"
                                        name={key}
                                        value={item.toString()}
                                        label={item.toString()}
                                        onChange={FilterForm.handleChange}
                                        values={FilterForm.values[key]}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </form>
        </div>
    );
};

export default FilrerDashboard;
