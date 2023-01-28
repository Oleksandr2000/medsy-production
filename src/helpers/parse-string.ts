import CyrillicToTranslit from "cyrillic-to-translit-js";
export const parseString = (str: string): { [key: string]: { label: string; value: string[] } } | undefined => {
    let result = {};

    // @ts-ignore
    const cyrillicToTranslit = new CyrillicToTranslit();

    const string = str.trim()[str.trim().length - 1] === ";" ? str.trim().slice(0, -1) : str.trim();

    const array = string.split(";");

    array.forEach((item) => {
        const key = cyrillicToTranslit.transform(item.split(":")[0].trim(), "_").toLowerCase();

        const value = item.split(":")[1].split(",");

        result[key] = {
            label: item.split(":")[0].trim(),
            value: value.map((item) => item.trim()),
        };
    });

    return result ? result : undefined;
};
