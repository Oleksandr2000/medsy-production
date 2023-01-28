import Header from "./header";
import { Drawer, CartDrawer } from "containers/drawer/drawer";

const Layout = (props) => (
    <main
        className="relative min-h-screen flex-grow"
        style={{
            minHeight: "-webkit-fill-available",
            WebkitOverflowScrolling: "touch",
            ...props.style,
        }}
    >
        <Drawer />
        <Header />
        <div className="flex h-full min-h-screen w-full flex-grow flex-col">
            <div className="flex-auto px-3 pt-90px pb-50px md:px-35px">{props.children}</div>
        </div>
        <CartDrawer />
    </main>
);

export default Layout;
