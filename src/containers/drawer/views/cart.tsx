import { useContext, useState } from "react";
import { Scrollbar } from "components/scrollbar";
import { useCart } from "contexts/cart/cart.provider";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import CartItem from "components/cart-item";
import Button from "components/button";
import NoItem from "./no-item";
import ArrowLeft from "assets/icons/arrow-left";
import { useAdmin } from "contexts/admin/admin.provider";
import OrderSubmit from "./order-submit";
import { useLocalization } from "contexts/localization/localization.provider";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        close: () => void;
      };
    };
  }
}

export default function Cart() {
  const { items, calculatePrice, clearCart } = useCart();
  const { dispatch } = useContext(DrawerContext);
  const { personalData } = useAdmin();
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { localization } = useLocalization();

  const hideCart = () => {
    dispatch({
      type: "SLIDE_CART",
      payload: {
        open: false,
      },
    });
  };

  const submitOrder = async () => {
    if (!personalData) {
      return undefined;
    }

    setLoading(true);

    const res = await fetch(
      `https://api.chatbullet.com/api/v1/send/${personalData.orderDeepLink}/${personalData.aboneCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskHash: personalData.taskHash,
          cart: [...items],
        }),
      }
    );

    if (res.status === 200) {
      clearCart();
      setSuccess(true);
      window.close();
      window.Telegram.WebApp.close();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <OrderSubmit
        isSuccess
        message={localization.orderSuccessDetails}
        statusMessage={localization.orderSuccessTitle}
        thanksMessage={localization.orderSuccessThanks}
        onClick={() => {}}
      />
    );
  }

  if (error) {
    return (
      <OrderSubmit
        isError
        message={localization.orderErrorDetails}
        statusMessage={localization.orderErrorTitle}
        onClick={() => setError(false)}
        loading={loading}
      />
    );
  }

  return (
    <div className="flex flex-col w-full h-full dark:bg-darkTheme-bg bg-white">
      {items.length ? (
        <>
          <div className="w-full flex justify-center relative px-30px py-20px border-b border-gray-200 dark:border-dark">
            <button
              className="w-auto h-10 flex items-center justify-center dark:hover:text-gray-700 text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
              onClick={hideCart}
              aria-label="close"
            >
              <ArrowLeft />
            </button>

            <h2 className="font-bold text-24px m-0 dark:text-gray-300">
              {localization.basketTitle}
            </h2>
          </div>

          <Scrollbar className="cart-scrollbar flex-grow">
            {items.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </Scrollbar>
        </>
      ) : (
        <NoItem />
      )}

      <div className="flex flex-col p-30px">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900 dark:text-gray-400">
            {localization.basketSubtotal}
          </span>

          <span className="font-semibold text-18px text-gray-900 dark:text-gray-400">
            {calculatePrice()}
            <span className="ml-2">{localization.currency}</span>
          </span>
        </div>

        <Button
          className="big mt-20px bg-green font-bold hover:bg-green hover:opacity-90"
          disabled={!items.length ? true : false}
          onClick={submitOrder}
        >
          {localization.basketConfirm}
        </Button>
      </div>
    </div>
  );
}
