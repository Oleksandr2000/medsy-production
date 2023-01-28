export const useDarkTheme = () => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        return document.documentElement.classList.contains("dark");
    }
    return false;
};
