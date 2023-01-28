import { useContext } from "react";
import { DrawerContext } from "contexts/drawer/drawer.provider";
import ArrowLeft from "assets/icons/arrow-left";
import NotFound from "assets/icons/not-found";
import { useLocalization } from "contexts/localization/localization.provider";

export default function NoItem() {
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
            <div className="relative mb-30px flex w-full flex-shrink-0 justify-center border-b border-gray-200 px-30px py-20px dark:border-b-dark">
                <button
                    className="absolute top-half left-30px -mt-20px flex h-10 w-auto items-center justify-center text-gray-500 transition duration-300 hover:text-gray-900 focus:outline-none dark:hover:text-gray-700"
                    onClick={hideCart}
                    aria-label="close"
                >
                    <ArrowLeft />
                </button>
                <h2 className="m-0 text-21px font-semibold dark:text-gray-400">{localization.basketEmptyTitle}</h2>
            </div>

            <div className="flex-auto">
                <p className="px-10 text-center leading-loose text-gray-900 dark:text-gray-400">
                    {localization.basketEmptyMessage}
                </p>

                <div className="m-0 flex items-center justify-center">
                    <NotFound />
                </div>
            </div>
        </>
    );
}
