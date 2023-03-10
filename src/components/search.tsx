import React from "react";
import SearchIcon from "assets/icons/search-icon";
import { useSearch } from "contexts/search/search.provider";
import { SearchBase, SearchIconWrapper } from "components/utils/theme";
import { useLocalization } from "contexts/localization/localization.provider";

type SearchProps = { className?: string; id?: string };

const Search: React.FC<SearchProps> = ({ className, ...props }) => {
    const { localization } = useLocalization();
    const { searchTerm, setSearchTerm } = useSearch();
    const onSearch = (e) => {
        // e.preventDefault();
        const { value } = e.currentTarget;
        setSearchTerm(value);
    };
    const onSubmit = (e) => e.preventDefault();

    const classNames = SearchBase + " " + className;
    return (
        <form noValidate role="search" className={classNames} onSubmit={onSubmit}>
            <span className={SearchIconWrapper}>
                <SearchIcon color="#999999" />
            </span>
            {/* <label htmlFor={props.id || 'search-normal'} className="sr-only">
        {props.id || 'search-normal'}
      </label> */}
            <input
                type="search"
                placeholder={localization.searchPlaceholder}
                className="dark:placeholder:gray-400 h-12 w-full rounded border-2 border-transparent bg-gray-f7 px-4 pl-12 text-gray-900 placeholder-gray-500 outline-none transition duration-200 hover:border-gray-400 focus:border-black focus:placeholder-gray-900 dark:bg-slate-600 dark:text-gray-400 dark:focus:placeholder-gray-500"
                value={searchTerm}
                onChange={onSearch}
                // id={props.id || 'search-normal'}
                autoComplete="off"
                {...props}
            />
        </form>
    );
};

export default Search;
