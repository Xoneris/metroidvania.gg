import { PropsWithChildren } from "react";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import DashboardNavigation from "./Components/DashboardNavigation";

export default function DashboardLayout({children}: PropsWithChildren) {

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="grow bg-[#eeeeee] flex">
                
                <DashboardNavigation/>

                <section className="grow p-3 flex flex-col gap-2">
                    {children}
                </section>

            </main>
            <Footer/>
        </div>
    )
}