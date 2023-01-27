export const useDarkTheme = () => {
    if(typeof window === undefined){
        return;
    }

    const isDark = document.documentElement.classList.contains("dark");

    return isDark;
}