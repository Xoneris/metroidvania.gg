import { PropsWithChildren} from "react";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AdComponents from "@/Components/AdComponent";

export default function Layout({children}: PropsWithChildren) {

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="grow bg-[#eeeeee]">
                {children}
                <AdComponents dataAdSlot="9971178537"/>
            </main>
            <Footer/>
        </div>
    )
}