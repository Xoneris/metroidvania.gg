import { PropsWithChildren} from "react";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AdComponents from "@/Components/AdComponent";
import useWindowSize from "@/hooks/useWindowSize";

export default function Layout({children}: PropsWithChildren) {

    const { width, height } = useWindowSize()

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="grow bg-[#eeeeee]">
                {children}
                {
                    width > 800
                    ? <AdComponents dataAdSlot="9971178537" isResponsive={false} adWidth="728px" adHeight="90px"/>
                    : <AdComponents dataAdSlot="2384332553" isResponsive={false} adWidth="320px" adHeight="90px"/>
                    // <AdComponents dataAdSlot="1556472595" isResponsive={true} />
                }
            </main>
            <Footer/>
        </div>
    )
}