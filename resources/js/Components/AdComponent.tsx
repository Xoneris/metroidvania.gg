import { useEffect } from "react";

export default function AdComponents({ 
        dataAdSlot, adWidth, adHeight 
    }:{
        dataAdSlot:string, 
        adWidth:string, 
        adHeight:string
}) {

    const adtexts = [
        "Support MV.GG by whitelisting this site in your Adblock. No intrusive ads I promise!",
        "Running this site costs about ~20$ each month. Consider disabling your Adblock!",
        "Silksong actually released, can you believe it? It's actually real! Holy.",
        "Did you know: About ~33% of people using the Internet use Adblock.",
        "This is where I could promote your cool Metroidvania. Interested? metroidvaniagg@gmail.com.",
        "Funfact: Symphony of the Night initally underperformed in sales. It's popularity came later.",
        "Funfact: The term Metroidvania was invented by Fans and not by developers!"
    ]

    useEffect(() => {

        try {
            // @ts-ignore
            (window.adsbygoogle || []).push({});
        }

        catch (e) {
            console.log("AdSense Error: ", e)
        }

    },[]);

    return (

        <div className="relative p-4 flex justify-center items-center" style={{minWidth: adWidth, minHeight: adHeight}}>

            <div 
                className="absolute p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-lg border border-black bg-[#ccc]" 
                style={{width:adWidth, height:adHeight}}
            >
                <p className="text-sm text-[#555] text-center">
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