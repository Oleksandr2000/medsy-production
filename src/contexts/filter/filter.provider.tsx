import { createContext, useState, useContext } from "react";

const filterContext = createContext({} as any);

export const FilterProvider = ({ children }) => {
    const [data, setData] = useState();
    const [quantityFiltredProducts, setQuantityFiltredProducts] = useState();
    const [applyFiltersQuantity, setApplyFiltersQuantity] = useState(0);
    const [activeFilters, setActiveFilters] = useState();
    const [maxPrice, setMaxPrice] = useState<number>();
    const [minPrice, setMinPrice] = useState<number>(0);
    const [available, setAvailable] = useState<boolean>(false);
    const [rangePrice, setRangePrice] = useState([0, 1]);
    const [sort, setSort] = useState();

    return (
        <filterContext.Provider
            value={{
                data,
                setData,
                quantityFiltredProducts,
                setQuantityFiltredProducts,
                activeFilters,
                setActiveFilters,
                applyFiltersQuantity,
                setApplyFiltersQuantity,
                rangePrice,
                setRangePrice,
                sort,
                setSort,
                maxPrice,
                setMaxPrice,
                minPrice,
                setMinPrice,
                available,
                setAvailable,
            }}
        >
            {children}
        </filterContext.Provider>
    );
};

export const useFilter = () => useContext(filterContext);
