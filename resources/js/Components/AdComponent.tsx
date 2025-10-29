import { useEffect, useState } from "react";

export default function AdComponents({ 
        dataAdSlot, adWidth, adHeight, isManagedAdSlot = true
    }:{
        dataAdSlot:string, 
        adWidth:"728px"|"320px"|"160px", 
        adHeight:"100px"|"90px"|"600px",
        isManagedAdSlot?: boolean
}){

    const adtexts = [
        "Support MV.GG by whitelisting this site in your Adblock. No intrusive ads I promise!",
        "Running this site costs about ~20$ each month. Consider disabling your Adblock!",
        "Silksong actually released, can you believe it? It's actually real! Holy.",
        "Did you know: About ~33% of people using the Internet use Adblock.",
        "This is where I could promote your cool Metroidvania. Interested? metroidvaniagg @gmail.com.",
        "Funfact: Symphony of the Night initally underperformed in sales. It's popularity came later.",
        "Funfact: The term Metroidvania was invented by Fans and not by developers!"
    ]

    const [managedContent, setManagedContent] = useState({
        id: 0,
        media: "",
        link: "",
    })

    const openInNewTab = (href:string) => {
        const a = document.createElement('a')
        a.href = href
        a.target = "_blank"
        a.click()
    }

    useEffect(() => {

        if (isManagedAdSlot) {

            // const BASE_API_URL = "http://localhost:8000/api" 
            const BASE_API_URL = "https://metroidvania.gg/api"
            
            const getManagedContent = async () => {
                
                const size = (adWidth.slice(0, -2) + "x" + adHeight).toString()
                const res = await fetch(BASE_API_URL + `/managed-content/${size}`)
                const data = await res.json()
                setManagedContent(data)
            }
            
            getManagedContent()
        }        
        

        try {
            // @ts-ignore
            (window.adsbygoogle || []).push({});
        }
        catch (e) {
            console.log("AdSense Error: ", e)
        }

    },[]);

    return (

        <div className="relative m-4 flex justify-center items-center" style={{minWidth: adWidth, minHeight: adHeight}}>

            {
                // managedContent.media !== ""
                isManagedAdSlot
                ? <a 
                    href={managedContent?.link}
                    onClick={(e) => {
                        e.preventDefault()
                        openInNewTab(`/managed-content/${managedContent?.id}`)
                    }}
                >
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-lg border hover:cursor-pointer" 
                        style={{
                            minWidth:adWidth, 
                            minHeight:adHeight,
                            backgroundImage: `url('/storage/managed-images/${managedContent?.media}')`
                        }}
                    >
                    </div>
                </a>
                : <div 
                    className="absolute p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-lg border border-black bg-[#ccc]" 
                    style={{width:adWidth, height:adHeight}}
                >
                    <p className="text-sm text-[#555] text-center">
                        {adtexts[Math.floor(Math.random() * adtexts.length)]}
                    </p>
                </div>
            }

            <ins className="adsbygoogle"
                style={{display:"inline-block", width:adWidth, height:adHeight}}
                data-ad-client="ca-pub-7981802089975633"
                data-ad-slot={dataAdSlot}
            ></ins>

        </div>
    )
}