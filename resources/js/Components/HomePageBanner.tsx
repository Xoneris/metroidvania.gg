import { GameData } from "@/types";
import { useState } from "react";

export default function HomePageBanner({games}:{games:GameData[]}) {

    const [heroTrailer, setHeroTrailer] = useState<string>(games[0]?.trailer)

    return (
        <div className="w-full bg-[#111111] px-5 py-3 text-[#999999]">
            <div className="max-w-[1600px] m-auto flex border border-transparent rounded-2xl shadow-homePageHeroShadow">
                
                <div className="w-[72%] z-10">
                    <iframe 
                        className="w-full h-auto border border-transparent aspect-video rounded-l-2xl"
                        title="Hero-Trailer"
                        src={"https://www.youtube.com/embed/" + heroTrailer}>
                    </iframe>
                </div>

                <div className="w-[28%] flex flex-col justify-between">

                    <div className="relative group" onClick={() => {setHeroTrailer(games[0]?.trailer)}}>
                        <span className={`absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[0]?.trailer ? "text-mainOrange" : null}`}>
                            Latest Release
                        </span>
                        <img 
                            className={`rounded-r-2xl transition-all duration-500 ${heroTrailer !== games[0]?.trailer ? "-translate-x-12 opacity-30 group-hover:-translate-x-0 group-hover:opacity-100" : null}`}
                            src={"/assets/thumbnails/"+games[0]?.slug+".jpg"} 
                        />
                    </div>

                    <div className="relative group" onClick={() => {setHeroTrailer(games[1]?.trailer)}}>
                        <span className={`absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[1]?.trailer ? "text-mainOrange" : null}`}>
                            Coming Soon
                        </span>
                        <img 
                            className={`rounded-r-2xl transition-all duration-500 ${heroTrailer !== games[1]?.trailer ? "-translate-x-12 opacity-30 group-hover:-translate-x-0 group-hover:opacity-100" : null}`}
                            src={"/assets/thumbnails/"+games[1]?.slug+".jpg"} 
                        />
                    </div>

                    {
                        // If there are no currently Live Kickstarters, instead show a game with an upcoming Kickstarter
                        games[2] 
                        ? <div className="relative group" onClick={() => {setHeroTrailer(games[2]?.trailer)}}>
                            <span className={`absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[2]?.trailer ? "text-mainOrange" : null}`}>
                                Live on Kickstarter
                            </span>
                            <img 
                                className={`rounded-r-2xl transition-all duration-500  ${heroTrailer !== games[2]?.trailer ? "-translate-x-12 opacity-30 group-hover:-translate-x-0 group-hover:opacity-100" : null}`}
                                src={"/assets/thumbnails/"+games[2]?.slug+".jpg"} 
                            />
                        </div>

                        : <div className="relative group" onClick={() => {setHeroTrailer(games[3]?.trailer)}}>
                            <span className={`absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[3]?.trailer ? "text-mainOrange" : null}`}>
                                Upcoming Kickstarter
                            </span>
                            <img 
                                className={`rounded-r-2xl transition-all duration-500  ${heroTrailer !== games[3]?.trailer ? "-translate-x-12 opacity-30 group-hover:-translate-x-0 group-hover:opacity-100" : null}`}
                                src={"/assets/thumbnails/"+games[3]?.slug+".jpg"} 
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}