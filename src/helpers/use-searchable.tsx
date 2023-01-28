import { useMemo } from "react";

export const useSearchable = (
  data,
  category?,
  searchText?,
  searchProps?,
  filters?,
  price?,
  field = "name",
  orderBy?,
  available?,
) => {
  return useMemo(() => {
    const regex = new RegExp(searchText, "i");
    let _data = data;
    if (category) {
      _data = _data.filter((item) =>
        item.category_ids.includes(category)
      );
    }

    if(available){
      _data = _data.filter(item => item.quantity >= 1);
    }

    if (filters) {
      const filtersName = Object.keys(filters);

      for (let i = 0; i < filtersName.length; i++) {
        if (filters[filtersName[i]].length > 0) {
          _data = _data.filter((item) => {
            let equal = false;
            filters[filtersName[i]].forEach((elem) => {
              if (
                item.params[filtersName[i]] &&
                item.params[filtersName[i]].value.includes(elem)
              ) {
                equal = true;
              }
            });

            if (equal) {
              return item;
            }
          });
        }
      }
    }

    if (price?.length > 0) {
      _data = _data.filter(
        (item) => item.price >= price[0] && item.price <= price[1]
      );
    }

    _data = _data.filter((item) =>
      searchProps(item).some((sp) => regex.test(sp))
    );

    _data.sort((i, j) => {
      if (field === "price") {
        if (Number(i[field]) > Number(j[field])) {
          return orderBy;
        } else if (Number(i[field]) < Number(j[field])) {
          return orderBy === 1 ? -1 : 1;
        } else {
          return 0;
        }
      } else {
        if (i[field] > j[field]) {
          return orderBy;
        } else if (i[field] < j[field]) {
          return orderBy === 1 ? -1 : 1;
        } else {
          return 0;
        }
      }
    });

    _data.length;

    return { filtredProducts: _data, filtredProductsCount: _data.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, searchText, filters, searchProps, price, field, orderBy]);
};
// const useSearchable = <T>(data: T[], searchText: string, searchProps: (item: T) => string[]) => {
//   return useMemo(() => {
//     const regex = new RegExp(searchText, "i");
//     return data.filter((item) =>
//       searchProps(item).some((sp) => regex.test(sp))
//     );
//   }, [data, searchText, searchProps]);
// };
// export default useSearchable;
