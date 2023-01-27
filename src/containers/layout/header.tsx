import { useContext } from "react";
import CartIcon from "assets/icons/cart-icon";
import Search from "components/search";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useCart } from "contexts/cart/cart.provider";
import { useCategory } from "contexts/category/use-category";

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

  return (
    <header className="flex items-center shadow-mobile text-gray-700 body-font fixed bg-white dark:bg-darkTheme-bg w-full h-90px z-20 lg:shadow-header px-20px md:px-30px lg:px-40px dark:shadow-header dark:shadow-slate-700">
      <button
        onClick={() => setCategory({ id: "", parentId: "", name: "" })}
        className="cursor-pointer"
      >
        <svg width={30} height={30} className="hidden">
          <symbol viewBox="0 0 50 50" id="home">
            <g id="Layer_1" className="dark:fill-slate-400">
              <path d="M33,4v5.586l-8-8L1.293,25.293l1.414,1.414L4,25.414V49h14h14h14V25.414l1.293,1.293l1.414-1.414L42,18.586V4H33z M35,6h5   v10.586l-5-5V6z M20,47V31h10v16H20z M44,47H32V29H18v18H6V23.414l19-19l19,19V47z" />
            </g>
          </symbol>
        </svg>
        <svg className="w-[30px] h-[30px] stroke-dark dark:stroke-slate-400 border-solid">
          <use xlinkHref="#home"></use>
        </svg>
      </button>

      <div className="w-full mx-6 flex justify-center">
        <Search />
      </div>

      <button
        className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        onClick={showCart}
        aria-label="cart-button"
      >
        <CartIcon width="30px" height="30px" />
        <span
          className="w-18px h-18px flex items-center justify-center bg-gray-900 text-white absolute rounded-full dark:bg-white dark:text-dark"
          style={{ fontSize: "12px", top: "-10px", right: "-10px" }}
        >
          {itemsCount}
        </span>
      </button>
    </header>
  );
}
