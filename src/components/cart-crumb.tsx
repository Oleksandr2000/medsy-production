import React, { useContext } from "react";

import CartIcon from "assets/icons/cart-icon";

import { DrawerContext } from "contexts/drawer/drawer.provider";
import { useCart } from "contexts/cart/cart.provider";

const CartCrumb = () => {
  const { dispatch }: any = useContext(DrawerContext);
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
    <button
      className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
      onClick={showCart}
      aria-label="cart-button"
    >
      <CartIcon width="20px" height="20px" />
      <span
        className="w-18px h-18px flex items-center justify-center bg-gray-900 text-white absolute rounded-full dark:bg-white dark:text-dark"
        style={{ fontSize: "12px", top: "-10px", right: "-10px" }}
      >
        {itemsCount}
      </span>
    </button>
  );
};

export default CartCrumb;
