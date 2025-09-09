import AdComponents from "@/Components/AdComponent";
import GameThumbnail from "@/Components/GameThumbnails";
import useWindowSize from "@/hooks/useWindowSize";
import LayoutWithAdSidebars from "@/Layouts/LayoutWithAdSidebars";
import { TGameThumbnail } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";


export default function Released ({games}:{games:TGameThumbnail[]}) {

    const { width, height } = useWindowSize()
    const [yearSelect, setYearSelect] = useState<string>("2025")
    const allPossibleYearsToSelect = [...new Set(games.filter(game => game.release_date !== "0000-00-00").map(game => game.release_date.split("-")[0]))]
    const months: string[] = []
    
    for(let i=1; i<13; i++) {
        if (i < 10) {
            months.push("0" + i)
        } else {
            months.push("" + i)
        }
    }

    // Convert numbers (1-12) to it's corresponding month
    function getMonthName(monthNumber:string) {
      
        const date = new Date();
        date.setMonth(Number(monthNumber) - 1);
        return date.toLocaleString('en-GB', { month: 'long' });

    }

    return (
        <LayoutWithAdSidebars>

            <Head>
                <title>{"All Releases"}</title>
                <meta name="description" content={`A curated list of Metroidvania games which released between ${allPossibleYearsToSelect[0]} and ${allPossibleYearsToSelect[allPossibleYearsToSelect.length - 1]}`} />

                <meta property="og:title" content={"All Releases"}/>
                <meta property="og:description" content={`A curated list of Metroidvania games which released between ${allPossibleYearsToSelect[0]} and ${allPossibleYearsToSelect[allPossibleYearsToSelect.length - 1]}`} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg/Released"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[(Math.floor(Math.random() * games.length))].slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={"All Releases"}/>
                <meta name="twitter:description" content={`A curated list of Metroidvania games which released between ${allPossibleYearsToSelect[0]} and ${allPossibleYearsToSelect[allPossibleYearsToSelect.length - 1]}`}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[(Math.floor(Math.random() * games.length))].slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head>

            <section className="max-w-[1920px] w-full flex flex-col p-4 gap-2">
                
                <h1 className="text-2xl">All Releases</h1>
                <hr className="bg-black w-full h-[2px]"/>

                <ul className="w-full flex justify-center items-center gap-2">
                    
                {
                    allPossibleYearsToSelect.map((year) => (
                        <li className={`
                            transition-all hover:cursor-pointer
                            ${yearSelect === year ? "text-2xl font-bold" : "text-1xl hover:underline"}
                            `}
                            onClick={() => setYearSelect(year)}
                        >
                            {year}
                        </li>
                    ))
                }
                </ul>

                {
                    months.reverse().map((month,index) => (

                        <>
                            {
                            games.filter(game => game.release_date.split("-")[0] === yearSelect && game.release_date.split("-")[1] === month).length > 0
                            ? <div className="flex flex-col gap-2">

                                    <h2 className="font-bold">{getMonthName(month)}</h2>
                                    <hr className="bg-black w-full h-[2px]"/>

                                    <div className="flex flex-wrap justify-around">
                                    {
                                        games.filter(game => game.release_date.split("-")[0] === yearSelect && game.release_date.split("-")[1] === month).map((game) => (
                                            <GameThumbnail game={game} key={game.id}/>
                                        ))
                                    }
                                    </div>
                                
                            </div>
                            : null
                            }

                            {/* Not putting ads here for now because there is an inconsistency on frequency based if certain months have games in it or not */}
                            
                            {/* {
                                (index+1) % 3 === 0
                                ? width > 967
                                    ? null
                                    : width > 807
                                        ? <AdComponents dataAdSlot="8604046928" adWidth="728px" adHeight="90px" />
                                        : <AdComponents dataAdSlot="6692199453" adWidth="320px" adHeight="100px" />
                                : null
                            } */}
                        </>
                    ))
                }
            </section>
        </LayoutWithAdSidebars>
    )
}