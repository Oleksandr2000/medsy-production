import { useLocalization } from "contexts/localization/localization.provider";
import Image from "next/image";
import { ItemCardBase, ItemCardImage, ItemCardContent, ItemCardPrice } from "./utils/theme";

interface ItemProps {
    image: string;
    name: string;
    price: number;
}

interface ItemCardProps {
    item: ItemProps;
    onClick?: (e: any) => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
    const { localization } = useLocalization();

    return (
        <div className={ItemCardBase} onClick={onClick}>
            <div className={ItemCardImage}>
                <Image
                    src={item.image[0]}
                    alt={"Alt " + item.name}
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL={item.image[0]}
                />
            </div>

            <div className={ItemCardContent}>
                <span className={ItemCardPrice}>
                    {item.price}
                    <span className="ml-1">{localization.currency}</span>
                </span>
                <span className="text-13px">{item.name}</span>
            </div>
        </div>
    );
}
