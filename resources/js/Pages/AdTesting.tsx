import AdComponents from "@/Components/AdComponent";
import ClientOnly from "@/Components/ClientOnly";
import Layout from "@/Layouts/Layout";

export default function AdTesting() {

    return (
        <Layout>
            <div className="w-full flex gap 2 justify-center items-center">

                <div>
                    <ClientOnly>
                        <AdComponents 
                            dataAdSlot=""
                            adWidth="160px"
                            adHeight="600px"
                            isManagedAdSlot={true}
                        />
                    </ClientOnly>
                </div>
                <div className="flex flex-col">
                    <ClientOnly>

                        <AdComponents 
                            dataAdSlot=""
                            adWidth="728px"
                            adHeight="90px"
                            isManagedAdSlot={true}
                        />


                        <AdComponents 
                            dataAdSlot=""
                            adWidth="320px"
                            adHeight="100px"
                            isManagedAdSlot={true}
                        />

                    </ClientOnly>

                </div>

            </div>
        </Layout>
    )
}