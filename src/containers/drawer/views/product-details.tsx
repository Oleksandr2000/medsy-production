import React, { useState, useContext } from "react";
import { Scrollbar } from "components/scrollbar";
import Button from "components/button";
import { useCart } from "contexts/cart/cart.provider";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import ArrowLeft from "assets/icons/arrow-left";
import Counter from "components/counter";
import CartCrumb from "components/cart-crumb";
import { toTitleCase } from "helpers/to-title-case";
import { useLocalization } from "contexts/localization/localization.provider";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowButtonBase,
  ButtonGroupBase,
} from "../../../components/utils/theme";
import ChevronLeft from "../../../assets/icons/chevron-left";
import ChevronRight from "../../../assets/icons/chevron-right";

export default function ProductDetails() {
  const { addItem, getItem, removeItem } = useCart();
  const { state, dispatch } = useContext(DrawerContext);
  const { localization } = useLocalization();

  const count = getItem(state.item.id)?.quantity;

  const hideDetails = () => {
    dispatch({
      type: "TOGGLE_PRODUCT_DETAIL",
      payload: {
        showDetails: false,
      },
    });

    dispatch({
      type: "SLIDE_CART",
      payload: {
        open: false,
      },
    });
  };

  const addToCart = () => {
    addItem({...state.item, maxQuantity: state.item.quantity});
    dispatch({
      type: "TOGGLE_CART_VIEW",
      payload: {
        showCart: true,
      },
    });
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 dark:bg-darkTheme-bg">
      <div className="w-full flex justify-between items-center  px-30px py-20px">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 dark:hover:text-gray-700 transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideDetails}
          aria-label="close"
        >
          <ArrowLeft />
        </button>

        <h2 className="font-bold text-24px m-0 dark:text-gray-400">
          {localization.detailsTitle}
        </h2>

        <CartCrumb />
      </div>

      <Scrollbar className="details-scrollbar flex-grow">
        <div className="flex flex-col p-30px pt-0">
          <div className="relative flex items-center justify-center w-full h-360px overflow-hidden rounded mb-30px">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={{
                prevEl: ".swiper-previous-button",
                nextEl: ".swiper-next-button",
              }}
              className="h-360px w-full"
            >
              {state.item.image.map((src, index) => (
                <SwiperSlide key={index} className="h-[360px] m-0">
                  <img
                    src={src}
                    alt="img"
                    className="w-full h-full object-scale-down"
                  />
                </SwiperSlide>
              ))}
              <div className={ButtonGroupBase + " " + "z-10"}>
                <button
                  aria-label="prev-button"
                  className={
                    ArrowButtonBase +
                    " " +
                    "left-0 ml-[5px] swiper-previous-button"
                  }
                >
                  <ChevronLeft height="12px" />
                </button>
                <button
                  aria-label="next-button"
                  className={
                    ArrowButtonBase +
                    " " +
                    "right-0 mr-[5px] swiper-next-button"
                  }
                >
                  <ChevronRight height="12px" />
                </button>
              </div>
            </Swiper>
          </div>

          <div className="flex flex-col items-start mb-4">
            <span className="text-gray-900 text-16px font-semibold mb-2 dark:text-gray-300">
              {state.item.price}
              <span className="ml-1">{localization.currency}</span>
            </span>
            <span className="mb-5 text-18px font-bold dark:text-gray-500">{state.item.name}</span>
            <p className="flex items-center mb-5">
              <span className={`text-14px px-3 py-1 border rounded-xl ${state.item.quantity == 0 ? "border-error text-error" : "border-green text-green"}`}>
                {state.item.quantity == 0 ? localization.notAvailable : localization.available}
              </span>
            </p>
            <h3 className="pt-5 text-16px font-bold text-gray-900 dark:text-gray-400">{localization.params}</h3>
            <div className="mb-3">
              {Object.keys(state.item.params).map((item: any, index) => {
                return (
                  <div key={index} className="my-3">
                    <div className="text-16px font-semibold text-dark dark:text-gray-600">
                      {toTitleCase(state.item.params[item].label)}
                    </div>
                    {state.item.params[item].value.map((value, index) => {
                      return (
                        <div key={index} className="text-gray-500 text-14px my-1">
                          <div className="inline-block bg-gray-400 mr-3 h-2 w-2 rounded-10px" />
                          {toTitleCase(value)}.
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <h3 className="pt-5 text-16px font-bold text-gray-900 dark:text-gray-400">{localization.description}</h3>
            <p className="text-gray-500 text-14px my-1">
              {state.item.description}
            </p>
          </div>
        </div>
      </Scrollbar>

      <div className="flex flex-col p-30px">
        {count > 0 ? (
          <Counter
            value={count}
            variant='green'
            className="ml-auto w-full big"
            size="big"
            onIncrement={() => {
              state.item.quantity > count ? addItem({...state.item, maxQuantity: state.item.quantity}) : () => {};
            }}
            onDecrement={() => removeItem(state.item)}
          />
        ) : (
          <Button disabled={state.item.quantity < 1} className="w-full big bg-green font-bold hover:bg-green hover:opacity-90" onClick={addToCart}>
            {localization.detailsAdd}
          </Button>
        )}
      </div>
    </div>
  );
}
