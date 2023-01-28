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
            className="relative flex h-auto flex-shrink-0 items-center justify-center focus:outline-none"
            onClick={showCart}
            aria-label="cart-button"
        >
            <CartIcon width="20px" height="20px" />
            <span
                className="absolute flex h-18px w-18px items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-dark"
                style={{ fontSize: "12px", top: "-10px", right: "-10px" }}
            >
                {itemsCount}
            </span>
        </button>
    );
};

export default CartCrumb;
