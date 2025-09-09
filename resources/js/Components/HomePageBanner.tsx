import { THomeBannerSectionGames } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import BannerCarousel from "./BannerCarousel";

export default function HomePageBanner({games}:{games:THomeBannerSectionGames[]}) {

    const [heroTrailer, setHeroTrailer] = useState<string>(games[0]?.trailer)
    const [moreInfoBtn, setMoreInfoBtn] = useState<string>(games[0]?.slug)

    return (
        <div className="w-full bg-[#111111] px-5 py-3 text-[#999999]">
            <div className="max-w-[1600px] m-auto flex flex-col lg:flex-row border border-transparent rounded-2xl shadow-homePageHeroShadow">
                
                <div className="relative w-full lg:w-[72%] z-10">
                    <iframe 
                        className="w-full h-auto border border-transparent aspect-video rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl"
                        title="Hero-Trailer"
                        src={"https://www.youtube.com/embed/" + heroTrailer}>
                    </iframe>

                    <div className="absolute bottom-14 right-6 p-2 bg-black bg-opacity-50 border-mainOrange text-mainOrange rounded-lg border z-50 transition-all hover:bg-mainOrange hover:text-black hover:scale-125 hover:cursor-pointer">
                        <Link href={"/Game/" + moreInfoBtn}>
                            More Info!
                        </Link>
                    </div>

                </div>

                <div className="w-full lg:w-[28%] flex flex-row lg:flex-col justify-between">

                    <div className="relative group" onClick={() => {setHeroTrailer(games[0]?.trailer), setMoreInfoBtn(games[0]?.slug)}}>
                        <span className={`hidden lg:block absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[0]?.trailer ? "text-mainOrange" : null}`}>
                            Latest Release
                        </span>
                        <img 
                            className={`lg:rounded-r-2xl lg:rounded-bl-none rounded-b-2xl transition-all duration-500 ${heroTrailer !== games[0]?.trailer ? "-translate-y-4 lg:-translate-y-0 lg:-translate-x-12 opacity-30 group-hover:cursor-pointer group-hover:-translate-y-0 group-hover:lg:-translate-x-0 group-hover:opacity-100" : null}`}
                            src={"/storage/thumbnails/"+games[0]?.slug+".jpg"} 
                        />
                    </div>

                    <div className="relative group" onClick={() => {setHeroTrailer(games[1]?.trailer), setMoreInfoBtn(games[1]?.slug)}}>
                        <span className={`hidden lg:block absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[1]?.trailer ? "text-mainOrange" : null}`}>
                            Coming Soon
                        </span>
                        <img 
                            className={`lg:rounded-r-2xl lg:rounded-bl-none rounded-b-2xl transition-all duration-500 ${heroTrailer !== games[1]?.trailer ? "-translate-y-4 lg:-translate-y-0 lg:-translate-x-12 opacity-30 group-hover:cursor-pointer group-hover:-translate-y-0 group-hover:lg:-translate-x-0 group-hover:opacity-100" : null}`}
                            src={"/storage/thumbnails/"+games[1]?.slug+".jpg"} 
                        />
                    </div>

                    {
                        // If there are no currently Live Kickstarters, instead show a game with an upcoming Kickstarter
                        games[2] 
                        ? <div className="relative group" onClick={() => {setHeroTrailer(games[2]?.trailer), setMoreInfoBtn(games[2]?.slug)}}>
                            <span className={`hidden lg:block absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[2]?.trailer ? "text-mainOrange" : null}`}>
                                Live on Kickstarter
                            </span>
                            <img 
                                className={`lg:rounded-r-2xl lg:rounded-bl-none rounded-b-2xl transition-all duration-500 ${heroTrailer !== games[2]?.trailer ? "-translate-y-4 lg:-translate-y-0 lg:-translate-x-12 opacity-30 group-hover:cursor-pointer group-hover:-translate-y-0 group-hover:lg:-translate-x-0 group-hover:opacity-100" : null}`}
                                src={"/storage/thumbnails/"+games[2]?.slug+".jpg"} 
                            />
                        </div>

                        : <div className="relative group" onClick={() => {setHeroTrailer(games[3]?.trailer), setMoreInfoBtn(games[3]?.slug)}}>
                            <span className={`hidden lg:block absolute p-[6px] bg-black bg-opacity-70 text-xl rounded-br-lg z-10 ${heroTrailer === games[3]?.trailer ? "text-mainOrange" : null}`}>
                                Upcoming Kickstarter
                            </span>
                            <img 
                                className={`lg:rounded-r-2xl lg:rounded-bl-none rounded-b-2xl transition-all duration-500 ${heroTrailer !== games[3]?.trailer ? "-translate-y-4 lg:-translate-y-0 lg:-translate-x-12 opacity-30 group-hover:cursor-pointer group-hover:-translate-y-0 group-hover:lg:-translate-x-0 group-hover:opacity-100" : null}`}
                                src={"/storage/thumbnails/"+games[3]?.slug+".jpg"} 
                            />
                        </div>
                    }
                </div>
            </div>

            {/* <div className="flex sm:hidden">
                <BannerCarousel games={games} />
            </div> */}
        </div>
    )
}