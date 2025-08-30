import { useEffect } from "react";

export default function AdComponents(props:any) {
    const { dataAdSlot, adWidth, adHeight } = props;

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
        <div className="relative w-full p-4 flex justify-center items-center">

            <div className="absolute m-8 w-[calc(100%-64px)] h-[calc(100%-64px)] p-4 top-0 left-0 flex justify-center items-center rounded-lg border border-black bg-[#ccc]">
                <p className="text-sm text-[#333] text-center">
                Support MV.GG by whitelisting this site in your Adblock. No intrusive ads I promise!
                </p>
            </div>

            <ins className="adsbygoogle"
                style={{display:"inline-block", width:adWidth, height:adHeight}}
                data-ad-client="ca-pub-7981802089975633"
                data-ad-slot={dataAdSlot}
            ></ins>

            {/* <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="pub-7981802089975633"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
                data-adtest="on"
            ></ins> */}
        </div>
    )
}