import Counter from "./counter";
import Image from "next/image";
import { useCart } from "contexts/cart/cart.provider";
import {
    CartItemBase,
    CartItemImage,
    CartItemContent,
    CartItemName,
    CartItemSinglePrice,
    CartItemTotalPrice,
} from "./utils/theme";
import { useLocalization } from "contexts/localization/localization.provider";

type CartItemProps = {
    item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { addItem, removeItem } = useCart();
    const { localization } = useLocalization();

    return (
        <div className={CartItemBase}>
            <div className={CartItemImage}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={item.image[0]} alt={item.name} objectFit="contain" width={105} height={105} />
            </div>

            <div className={CartItemContent}>
                <span className={CartItemName}>{item.name}</span>
                <span className={CartItemSinglePrice}>
                    {localization.basketUnitPrice} {item.price}
                    {localization.currency}
                </span>

                <div className="flex flex-col-reverse items-start justify-between xs:flex-row xs:items-center">
                    <Counter
                        value={item.quantity}
                        onIncrement={() => (item.maxQuantity > item.quantity ? addItem(item) : () => {})}
                        onDecrement={() => removeItem(item)}
                    />

                    <div className={CartItemTotalPrice}>
                        {(item.price * item.quantity).toFixed(2)}
                        <span className="ml-2">{localization.currency}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
