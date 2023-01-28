import Plus from "assets/icons/plus-icon";
import Minus from "assets/icons/minus-icon";
import Trash from "assets/icons/trash";
import IconButton from "./icon-button";
import { CounterSizes } from "./utils/prop-types";
import { CounterValue } from "./utils/theme";
import cn from "classnames";

type CounterProps = {
    className?: string;
    value: number;
    size?: CounterSizes;
    onDecrement: (e: any) => void;
    onIncrement: (e: any) => void;
    variant?: "dark" | "green";
};

const Counter: React.FC<CounterProps> = ({
    onDecrement,
    onIncrement,
    value,
    size = "normal",
    className = "",
    variant = "dark",
}) => {
    return (
        <div
            className={cn(
                "flex flex-shrink-0 items-center justify-between overflow-hidden rounded bg-gray-900 shadow-floatingUp",
                className,
                {
                    "h-8": size === "normal",
                    "h-12": size === "big",
                    "bg-gray-900": variant === "dark",
                    "bg-green": variant === "green",
                },
            )}
        >
            <IconButton
                onClick={onDecrement}
                className={cn("h-full text-white transition duration-300 focus:outline-none", {
                    "w-60px": size === "big",
                    "w-35px": size !== "big",
                    "bg-gray-900 hover:bg-gray-3a": variant === "dark",
                    "bg-green hover:bg-green-light": variant === "green",
                })}
            >
                {value > 1 ? <Minus /> : <Trash />}
            </IconButton>

            <span className={CounterValue}>{value}</span>

            <IconButton
                onClick={onIncrement}
                className={cn("h-full text-white transition duration-300 focus:outline-none", {
                    "w-60px": size === "big",
                    "w-35px": size !== "big",
                    "bg-gray-900 hover:bg-gray-3a": variant === "dark",
                    "bg-green hover:bg-green-light": variant === "green",
                })}
            >
                <Plus />
            </IconButton>
        </div>
    );
};

export default Counter;
