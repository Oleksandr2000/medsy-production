import { createContext, useState, useContext } from "react";

const categoryContext = createContext({} as any);

export const CategoryProvider = ({ children }) => {
    const [category, setCategory] = useState({ id: "", parentId: "", name: "" });
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [parentCategoryName, setParentCategoryName] = useState("");

    return (
        <categoryContext.Provider
            value={{
                category,
                setCategory,
                parentCategoryId,
                setParentCategoryId,
                parentCategoryName,
                setParentCategoryName,
            }}
        >
            {children}
        </categoryContext.Provider>
    );
};

export const useCategory = () => useContext(categoryContext);
