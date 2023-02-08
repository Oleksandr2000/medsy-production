import { useContext } from "react";
import CartIcon from "assets/icons/cart-icon";
import Search from "components/search";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useCart } from "contexts/cart/cart.provider";
import { useCategory } from "contexts/category/use-category";
import { animatedScrollTo } from "react-select/dist/declarations/src/utils";

export default function Header() {
    const { dispatch }: any = useContext(DrawerContext);
    const { setCategory } = useCategory();
    const { itemsCount } = useCart();

    const showCart = () => {
        dispatch({
            type: "SLIDE_CART",
            payload: {
                open: true,
            },
        });
        dispatch({
            type: "TOGGLE_CART_VIEW",
            payload: {
                showCart: true,
            },
        });
    };

    const onClickHome = () => {
        setCategory({ id: "", parentId: "", name: "" });
        if (typeof window !== "undefined" && window !== null) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <header className="body-font fixed z-20 flex h-90px w-full items-center bg-white px-20px text-gray-700 shadow-mobile dark:bg-darkTheme-bg dark:shadow-header dark:shadow-slate-700 md:px-30px lg:px-40px lg:shadow-header">
            <button onClick={onClickHome} className="cursor-pointer">
                <svg width={30} height={30} className="hidden">
                    <symbol viewBox="0 0 50 50" id="home">
                        <g id="Layer_1" className="dark:fill-slate-400">
                            <path d="M33,4v5.586l-8-8L1.293,25.293l1.414,1.414L4,25.414V49h14h14h14V25.414l1.293,1.293l1.414-1.414L42,18.586V4H33z M35,6h5   v10.586l-5-5V6z M20,47V31h10v16H20z M44,47H32V29H18v18H6V23.414l19-19l19,19V47z" />
                        </g>
                    </symbol>
                </svg>
                <svg className="h-[30px] w-[30px] border-solid stroke-dark dark:stroke-slate-400">
                    <use xlinkHref="#home"></use>
                </svg>
            </button>

            <div className="mx-6 flex w-full justify-center">
                <Search />
            </div>

            <button
                className="relative flex h-auto flex-shrink-0 items-center justify-center focus:outline-none"
                onClick={showCart}
                aria-label="cart-button"
            >
                <CartIcon width="30px" height="30px" />
                <span
                    className="absolute flex h-18px w-18px items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-dark"
                    style={{ fontSize: "12px", top: "-10px", right: "-10px" }}
                >
                    {itemsCount}
                </span>
            </button>
        </header>
    );
}
