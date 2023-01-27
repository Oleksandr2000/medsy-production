import { useContext } from "react";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import ArrowLeft from "assets/icons/arrow-left";
import SuccessIcon from "assets/icons/success-tick";
import ErrorIcon from "assets/icons/error-tick";
import Button from "components/button";
import { useLocalization } from "contexts/localization/localization.provider";

interface IOrderStatus {
  isSuccess?: boolean;
  isError?: boolean;
  message: string;
  statusMessage: string;
  thanksMessage?: string;
  onClick: () => void;
  loading?: boolean;
}

export default function OrderSubmit({
  isSuccess = false,
  isError = false,
  message,
  statusMessage,
  thanksMessage,
  onClick,
}: IOrderStatus) {
  const { dispatch } = useContext(DrawerContext);
  const { localization } = useLocalization();

  const hideCart = () => {
    dispatch({
      type: "SLIDE_CART",
      payload: {
        open: false,
      },
    });
  };

  return (
    <>
      <div className="w-full flex px-30px relative bg-gray-100 dark:bg-darkTheme-bg">
        <button
          className="w-auto h-10 flex items-center justify-center dark:hover:text-gray-700 text-gray-500 absolute top-half mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900"
          onClick={hideCart}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
      </div>

      <div className="flex flex-col pb-60px flex-auto justify-center bg-gray-100 dark:bg-darkTheme-bg">
        {isSuccess && (
          <div className="flex items-center justify-center text-green">
            <SuccessIcon style={{ width: 60 }} />
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center text-error ">
            <ErrorIcon style={{ width: 60, height: 60 }} />
          </div>
        )}

        <div className="flex flex-col items-center px-40px md:px-80px mt-15px">
          <h3 className="text-center text-18px font-semibold text-gray-900 mb-40px dark:text-gray-400">
            {statusMessage}
          </h3>
          {thanksMessage && (
            <p className="text-center text-14px font-semibold text-gray-900 mb-1 dark:text-gray-400">
              {thanksMessage}
            </p>
          )}
          <p className="text-center text-13px text-gray-700 dark:text-gray-500">
            {message}
          </p>
        </div>
      </div>
      <div className="flex flex-col p-30px bg-gray-100 dark:bg-darkTheme-bg">
        <Button className="big w-full bg-green font-bold hover:bg-green hover:opacity-90" onClick={onClick}>
          {isSuccess
            ? localization.orderSuccessButton
            : localization.orderErrorButton}
        </Button>
      </div>
    </>
  );
}
