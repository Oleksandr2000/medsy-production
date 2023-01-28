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
            <div className="relative flex w-full bg-gray-100 px-30px dark:bg-darkTheme-bg">
                <button
                    className="absolute top-half left-30px mt-20px flex h-10 w-auto items-center justify-center text-gray-500 transition duration-300 hover:text-gray-900 focus:outline-none dark:hover:text-gray-700"
                    onClick={hideCart}
                    aria-label="close"
                >
                    <ArrowLeft />
                </button>
            </div>

            <div className="flex flex-auto flex-col justify-center bg-gray-100 pb-60px dark:bg-darkTheme-bg">
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

                <div className="mt-15px flex flex-col items-center px-40px md:px-80px">
                    <h3 className="mb-40px text-center text-18px font-semibold text-gray-900 dark:text-gray-400">
                        {statusMessage}
                    </h3>
                    {thanksMessage && (
                        <p className="mb-1 text-center text-14px font-semibold text-gray-900 dark:text-gray-400">
                            {thanksMessage}
                        </p>
                    )}
                    <p className="text-center text-13px text-gray-700 dark:text-gray-500">{message}</p>
                </div>
            </div>
            <div className="flex flex-col bg-gray-100 p-30px dark:bg-darkTheme-bg">
                <Button className="big w-full bg-green font-bold hover:bg-green hover:opacity-90" onClick={onClick}>
                    {isSuccess ? localization.orderSuccessButton : localization.orderErrorButton}
                </Button>
            </div>
        </>
    );
}
