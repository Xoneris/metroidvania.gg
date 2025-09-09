import ClientOnly from "@/Components/ClientOnly";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AdComponents from "@/Components/AdComponent";
import useWindowSize from "@/hooks/useWindowSize";

export default function LayoutWithAdSidebars({
        children, 
        noHeaderAd,
    }:{
        children: React.ReactNode, 
        noHeaderAd?:boolean,
}) {

    const { width, height } = useWindowSize()

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="grow w-full bg-[#eeeeee]">

                <div className="max-w-[1920px] m-auto flex">

                    <ClientOnly>
                        {
                            width > 967
                            ? <div className="sticky mt-0 top-0 max-h-[600px]">
                                <AdComponents dataAdSlot="7056813920" adWidth="160px" adHeight="600px" />
                            </div>
                            : null 
                        }
                    </ClientOnly>

                    <div className="flex flex-col w-full">
                        <ClientOnly>
                            {
                                noHeaderAd
                                ? null
                                // : width > 1210
                                // ? <AdComponents dataAdSlot="5552160565" adWidth="970px" adHeight="90px" />
                                : width > 807
                                ? <AdComponents dataAdSlot="8519452290" adWidth="728px" adHeight="90px" />
                                : <AdComponents dataAdSlot="9027822404" adWidth="320px" adHeight="100px" />
                            }
                        </ClientOnly>
                        
                        {children}
                    </div>
                    <ClientOnly>       
                        {
                            width > 1420
                            ? <div className="sticky mt-0 top-0 max-h-[600px]">
                                <AdComponents dataAdSlot="3817789955" adWidth="160px" adHeight="600px" />
                            </div>
                            : null
                        }
                    </ClientOnly> 
                    
                </div>

            </main>
            <Footer/>
        </div>
    )
}