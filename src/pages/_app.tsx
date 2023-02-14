import "rc-collapse/assets/index.css";
import "assets/styles/scrollbar.css";
import "assets/styles/rc-collapse.css";
import "assets/styles/index.css";
import "assets/styles/select.css";
import { CartProvider } from "contexts/cart/cart.provider";
import { DrawerProvider } from "contexts/drawer/drawer.provider";
import { SearchProvider } from "contexts/search/search.provider";
import "typeface-open-sans";
import { CategoryProvider } from "contexts/category/use-category";
import { FilterProvider } from "contexts/filter/filter.provider";
import { AdminProvider } from "contexts/admin/admin.provider";
import Script from "next/script";
import { LocalizationProvider } from "contexts/localization/localization.provider";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import MainPageLoader from "components/main-loader";

export default function CustomApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);

    return (
        <LocalizationProvider>
            <AdminProvider>
                <SearchProvider>
                    <CategoryProvider>
                        <DrawerProvider>
                            <CartProvider>
                                <FilterProvider>
                                    {loading ? <MainPageLoader /> : <Component {...pageProps} />}
                                    <Script src="https://telegram.org/js/telegram-web-app.js" />
                                </FilterProvider>
                            </CartProvider>
                        </DrawerProvider>
                    </CategoryProvider>
                </SearchProvider>
            </AdminProvider>
        </LocalizationProvider>
    );
}
