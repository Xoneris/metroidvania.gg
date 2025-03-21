import GameThumbnail from "@/Components/GameThumbnails";
import Layout from "@/Layouts/Layout";
import { GameData } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";


export default function Released ({games}:{games:GameData[]}) {

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
        <Layout>

            <Head title="All Releases" />

            <section className="max-w-[1920px] m-auto flex flex-col p-4 gap-2">
                
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
                    months.reverse().map((month) => (

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
                    ))
                }
            </section>
        </Layout>
    )
}