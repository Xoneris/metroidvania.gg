import { useEffect } from "react";

export default function AdComponents({ 
        dataAdSlot, isResponsive, adWidth, adHeight 
    }:{
        dataAdSlot:string, 
        isResponsive:boolean, 
        adWidth?:string, 
        adHeight?:string
}) {
    // const { dataAdSlot, adWidth, adHeight }:{dataAdSlot:string, isResponsive:boolean, adWidth?:string, adHeight?:string} = props;

    const adtexts = [
        "Support MV.GG by whitelisting this site in your Adblock. No intrusive ads I promise!",
        "Running this site costs about ~20$ each month. Consider disabling your Adblock!",
        "Silksong is releasing soon, can you believe it? It's actually happening! Holy.",
        "Did you know: About ~33% of people using the Internet use Adblock.",
        "This is where I could promote your cool Metroidvania. Interested? metroidvaniagg@gmail.com.",
        "Funfact: Symphony of the Night initally underperformed in sales. It's popularity came later.",
        "Funfact: The term Metroidvania was invented by Fans and not by developers!"
    ]

    useEffect(() => {

        try {
            // @ts-ignore
            (adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {
            console.log("AdSense Error: ", e)
        }

    },[]);

    return (

        isResponsive 
        ? <div className="min-w-screen h-auto flex justify-center items-center p-4">
            <ins className="adsbygoogle"
                style={{display:"block"}}
                data-ad-client="ca-pub-7981802089975633"
                data-ad-slot={{dataAdSlot}}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
        :<div className="relative w-full p-4 flex justify-center items-center" style={{minHeight: adHeight}}>

            <div 
                className="absolute p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-lg border border-black bg-[#ccc]" 
                style={{width:adWidth, height:adHeight}}
            >
                <p className="text-sm text-[#dd6b6b] text-center">
                    {adtexts[Math.floor(Math.random() * adtexts.length)]}
                </p>
            </div>

            <ins className="adsbygoogle"
                style={{display:"inline-block", width:adWidth, height:adHeight}}
                data-ad-client="ca-pub-7981802089975633"
                data-ad-slot={dataAdSlot}
            ></ins>
        </div>
        
    )
}