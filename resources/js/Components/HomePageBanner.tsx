import { THomeBannerSectionGames,TNews } from "@/types";
import { replaceMonthWithName } from "@/Utils/replaceMonthWithName";
import { Link } from "@inertiajs/react";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect } from "react";
import { useState } from "react";

export default function HomePageBanner({games, newsfeed}:{games:THomeBannerSectionGames[], newsfeed:TNews[]}) {

    const [newsAmount, setNewsAmount] = useState<number>(7)
    const { width } = useWindowSize()

    useEffect(() => {

        if (width < 1024) {
            setNewsAmount(7)
        } else if (width < 1180) {
            setNewsAmount(4)
        } else if (width < 1420) {
            setNewsAmount(5)
        } else if (width < 1620) {
            setNewsAmount(6)
        } else {
            setNewsAmount(7)
        }

    },[width])

    return (
        <div className="w-full bg-[#111111] px-5 py-4 text-[#999999]">

            <div className="flex flex-col lg:flex-row max-w-[1600px] m-auto rounded-2xl border border-mainOrange shadow-homePageHeroShadow">

                <div className="w-full lg:w-3/5 flex flex-col justify-center border-r-none lg:border-r border-mainOrange relative">
                    <div className="absolute top-0 right-0 bg-black/70 p-2 rounded-bl-lg rounded-tr-lg lg:rounded-tr-none text-sm lg:text-xl border-l border-b border-mainOrange text-white transition-all group-hover:text-mainOrange">Latest Release</div>
                    <iframe 
                        className="w-full h-auto border border-transparent aspect-video rounded-tl-2xl rounded-tr-lg lg:rounded-tr-none"
                        title="Hero-Trailer"
                        src={"https://www.youtube.com/embed/" + games[0]?.trailer}>
                    </iframe>

                    <div className="flex border-t border-mainOrange rounded-bl-none lg:rounded-bl-2xl">
                        <div className="w-full relative overflow-hidden lg:border-r border-mainOrange rounded-br-none lg:rounded-bl-none group hover:cursor-pointer">
                            <div className="relative lg:absolute top-0 left-0 bg-black/80 p-2 border-r border-b rounded-br-lg rounded-bl-lg lg:rounded-bl-none  border-mainOrange text-sm lg:text-xl text-white z-40 transition-all group-hover:text-mainOrange">Coming Soon</div>
                            <Link href={"/Game/" + games[1]?.slug}>
                                <img src={"/storage/thumbnails/"+games[1]?.slug+".jpg"} className="w-full mt-2 lg:mt-0 rounded-none lg:rounded-bl-lg transition-all group-hover:scale-[1.20]" />
                            </Link>
                        </div>
                        {
                            games[2] 
                            ? <div className="w-full relative overflow-hidden group hover:cursor-pointer">
                                <div className="relative lg:absolute top-0 left-0 bg-black/80 p-2 border-r border-b border-mainOrange rounded-br-lg rounded-bl-lg lg:rounded-bl-none text-sm lg:text-xl text-white z-40 transition-all group-hover:text-mainOrange">Live on Kickstarter</div>
                                <Link href={"/Game/" + games[2]?.slug}>
                                    <img src={"/storage/thumbnails/"+games[2]?.slug+".jpg"} className="w-full mt-2 lg:mt-0 transition-all group-hover:scale-[1.20]" />
                                </Link>
                            </div>
                            : <div className="w-full relative overflow-hidden group hover:cursor-pointer">
                                <div className="relative lg:absolute top-0 left-0 bg-black/80 p-2 border-r border-b border-mainOrange rounded-br-lg rounded-bl-lg lg:rounded-bl-none text-sm lg:text-xl text-white z-40 transition-all group-hover:text-mainOrange">Upcoming Kickstarter</div>
                                <Link href={"/Game/" + games[3]?.slug}>
                                    <img src={"/storage/thumbnails/"+games[3]?.slug+".jpg"} className="w-full mt-2 lg:mt-0 transition-all group-hover:scale-[1.20]" />
                                </Link>
                            </div>
                        }
                    </div>
                </div>   
                         
                <div className="flex flex-col gap-2 lg:gap-0 justify-between py-[1px] w-full lg:w-2/5">
                    <div className="block lg:hidden bg-black/80 p-2 mt-2 border border-mainOrange rounded-br-lg rounded-bl-lg text-sm lg:text-xl text-white z-40">Newsfeed</div>
                    {
                        newsfeed?.slice(0,newsAmount)?.map((news:TNews, index:number) => (
                            <div className={` ${index > 0 ? "pt-2 border-t border-mainOrange": null} flex items-center gap-2 text-sm lg:text-base`} key={index}>

                                <div className="w-full max-w-[220px] rounded-r-md overflow-hidden group">
                                    <Link href={"/Game/" + news?.slug}>
                                        <img src={"/storage/thumbnails/"+news?.slug+".jpg"} alt={news?.game + " thumbnail"} className="rounded-r-md transition-all group-hover:scale-[1.20] group-hover:cursor-pointer" />
                                    </Link>
                                </div>
                                <div className="flex flex-col lg:grow justify-around transition-all group-hover:pl-2">
                                    <div>
                                        <Link href={"/Game/" + news?.slug}>
                                            <h4 className="lg:text-xl text-mainOrange hover:underline hover:cursor-pointer">{news?.game}</h4>
                                        </Link>
                                        <p className="text-sm">{replaceMonthWithName(news?.created_at) + " - " + news?.created_at.slice(10, 16)}</p>
                                    </div>
                                    <p className="min-w-[200px]">
                                        {
                                            news?.type === "release_change"
                                            ? `New release date from ${news?.release_old} to ${news?.release_new}!`
                                            : news?.type === "demo_check"
                                                ? news?.has_demo === true
                                                    ? "Has a demo on steam now!"
                                                    : "No longer has a demo on steam!"
                                            : news?.type === "new_thumbnail"
                                            ? "Has a new thumbnail now!"
                                            : null
                                        }
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>

            {/* <div className="max-w-[1600px] m-auto flex flex-col lg:flex-row border border-transparent rounded-2xl shadow-homePageHeroShadow">

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
            </div> */}

            {/* <div className="flex sm:hidden">
                <BannerCarousel games={games} />
            </div> */}
        </div>
    )
}