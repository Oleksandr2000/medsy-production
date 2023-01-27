import "rc-collapse/assets/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
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

export default function CustomApp({ Component, pageProps }) {
  return (
    <LocalizationProvider>
      <AdminProvider>
        <SearchProvider>
          <CategoryProvider>
            <DrawerProvider>
              <CartProvider>
                <FilterProvider>
                  <Component {...pageProps} />
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
