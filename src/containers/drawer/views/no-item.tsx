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
      <div className="w-full flex justify-center flex-shrink-0 relative px-30px py-20px mb-30px border-b border-gray-200 dark:border-b-dark">
        <button
          className="w-auto h-10 flex items-center justify-center text-gray-500 absolute top-half -mt-20px left-30px transition duration-300 focus:outline-none hover:text-gray-900 dark:hover:text-gray-700"
          onClick={hideCart}
          aria-label="close"
        >
          <ArrowLeft />
        </button>
        <h2 className="font-semibold text-21px m-0 dark:text-gray-400">
          {localization.basketEmptyTitle}
        </h2>
      </div>

      <div className="flex-auto">
        <p className="text-center text-gray-900 px-10 leading-loose dark:text-gray-400">
          {localization.basketEmptyMessage}
        </p>

        <div className="flex items-center justify-center m-0">
          <NotFound />
        </div>
      </div>
    </>
  );
}
