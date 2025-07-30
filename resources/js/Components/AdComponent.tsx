import { useEffect } from "react";


export default function AdComponents(props:any) {
    const { dataAdSlot } = props;

    useEffect(() => {

        try {
            // @ts-ignore
            (adsbygoogle = window.adsbygoogle || []).push({});
        }

        catch (e) {
            console.log("AdSense Error")
        }

    },[]);

    return (
        <div>
        {/* <div className="bg-[#bbb] m-4 w-[calc(100%-32px)] h-20"> */}

            <ins className="adsbygoogle"
                style={{display:"inline-block", width:"728px", height:"90px"}}
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