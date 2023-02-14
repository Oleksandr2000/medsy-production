import React, { useContext } from "react";
import Button from "components/button";
import { useCart } from "contexts/cart/cart.provider";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import ArrowLeft from "assets/icons/arrow-left";
import Counter from "components/counter";
import CartCrumb from "components/cart-crumb";
import { toTitleCase } from "helpers/to-title-case";
import { useLocalization } from "contexts/localization/localization.provider";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowButtonBase, ButtonGroupBase } from "../../../components/utils/theme";
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
        addItem({ ...state.item, maxQuantity: state.item.quantity });
        dispatch({
            type: "TOGGLE_CART_VIEW",
            payload: {
                showCart: true,
            },
        });
    };

    return (
        <div className="flex h-full w-full flex-col bg-gray-100 dark:bg-darkTheme-bg">
            <div className="flex w-full items-center justify-between  px-30px py-20px">
                <button
                    className="flex h-10 w-auto items-center justify-center text-gray-500 transition duration-300 hover:text-gray-900 focus:outline-none dark:hover:text-gray-700"
                    onClick={hideDetails}
                    aria-label="close"
                >
                    <ArrowLeft />
                </button>

                <h2 className="m-0 text-24px font-bold dark:text-gray-400">{localization.detailsTitle}</h2>

                <CartCrumb />
            </div>

            <div className="flex-grow overflow-auto">
                <div className="flex flex-col p-30px pt-0">
                    <div className="relative mb-30px flex h-360px w-full items-center justify-center overflow-hidden rounded">
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
                                <SwiperSlide key={index} className="m-0 h-[360px]">
                                    <img src={src} alt="img" className="h-full w-full object-scale-down" />
                                </SwiperSlide>
                            ))}
                            <div className={ButtonGroupBase + " " + "z-10"}>
                                <button
                                    aria-label="prev-button"
                                    className={ArrowButtonBase + " " + "swiper-previous-button left-0 ml-[5px]"}
                                >
                                    <ChevronLeft height="12px" />
                                </button>
                                <button
                                    aria-label="next-button"
                                    className={ArrowButtonBase + " " + "swiper-next-button right-0 mr-[5px]"}
                                >
                                    <ChevronRight height="12px" />
                                </button>
                            </div>
                        </Swiper>
                    </div>

                    <div className="mb-4 flex flex-col items-start">
                        <span className="mb-2 text-16px font-semibold text-gray-900 dark:text-gray-300">
                            {state.item.price}
                            <span className="ml-1">{localization.currency}</span>
                        </span>
                        <span className="mb-5 text-18px font-bold dark:text-gray-500">{state.item.name}</span>
                        <p className="mb-5 flex items-center">
                            <span
                                className={`rounded-xl border px-3 py-1 text-14px ${
                                    state.item.quantity == 0 ? "border-error text-error" : "border-green text-green"
                                }`}
                            >
                                {state.item.quantity == 0 ? localization.notAvailable : localization.available}
                            </span>
                        </p>
                        <h3 className="pt-5 text-16px font-bold text-gray-900 dark:text-gray-400">
                            {localization.params}
                        </h3>
                        <div className="mb-3">
                            {Object.keys(state.item.params).map((item: any, index) => {
                                return (
                                    <div key={index} className="my-3">
                                        <div className="text-16px font-semibold text-dark dark:text-gray-600">
                                            {toTitleCase(state.item.params[item].label)}
                                        </div>
                                        {state.item.params[item].value.map((value, index) => {
                                            return (
                                                <div key={index} className="my-1 text-14px text-gray-500">
                                                    <div className="mr-3 inline-block h-2 w-2 rounded-10px bg-gray-400" />
                                                    {toTitleCase(value)}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <h3 className="pt-5 text-16px font-bold text-gray-900 dark:text-gray-400">
                            {localization.description}
                        </h3>
                        <p className="my-1 text-14px text-gray-500">{state.item.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-30px">
                {count > 0 ? (
                    <Counter
                        value={count}
                        variant="green"
                        className="big ml-auto w-full"
                        size="big"
                        onIncrement={() => {
                            state.item.quantity > count
                                ? addItem({ ...state.item, maxQuantity: state.item.quantity })
                                : () => {};
                        }}
                        onDecrement={() => removeItem(state.item)}
                    />
                ) : (
                    <Button
                        disabled={state.item.quantity < 1}
                        className="big w-full bg-green font-bold hover:bg-green hover:opacity-90"
                        onClick={addToCart}
                    >
                        {localization.detailsAdd}
                    </Button>
                )}
            </div>
        </div>
    );
}
