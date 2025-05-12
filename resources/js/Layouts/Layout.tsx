import { PropsWithChildren } from "react";

import Footer from "./Components/Footer";
import Header from "./Components/Header";

export default function Layout({children}: PropsWithChildren) {

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="grow bg-[#eeeeee]">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

