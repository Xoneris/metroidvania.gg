import GameThumbnail from "@/Components/GameThumbnails";
import Layout from "@/Layouts/Layout";
import LayoutWithAdSidebars from "@/Layouts/LayoutWithAdSidebars";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function SteamReviews({games}:{games:any}) {

    const steamReviewScores = ["Overwhelmingly Positive", "Very Positive", "Mostly Positive", "Positive", "Mixed"]

    const [selectedReviewScore, setSelectedReviewScore ] = useState<string>("Overwhelmingly Positive")

    return (
        <LayoutWithAdSidebars>

            <Head>
                <title>{"All Releases by reviews"}</title>
                <meta name="description" content={`A curated list of Metroidvania games sorted via Steam reviews`} />

                <meta property="og:title" content={"All Releases by reviews"}/>
                <meta property="og:description" content={`A curated list of Metroidvania games sorted via Steam reviews`} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg/steam-reviews"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[(Math.floor(Math.random() * games.length))].slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={"All Releases by reviews"}/>
                <meta name="twitter:description" content={`A curated list of Metroidvania games sorted via Steam reviews`}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[(Math.floor(Math.random() * games.length))].slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head>

            <section className="max-w-[1600px] w-full flex flex-col p-4 gap-2">

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Steam Reviews</h1>
                    <select 
                        className="rounded-lg bg-[#ccc]"
                        onChange={(e) => setSelectedReviewScore(e.target.value)}
                    >
                        {
                            steamReviewScores.map((reviewScore:string,index) => (
                                <option
                                    className="" 
                                    value={reviewScore}
                                    key={index}
                                >
                                    {reviewScore}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <hr className="bg-black w-full h-[2px]"/>

                {/* <ul className="w-full flex justify-center items-center gap-2">
                    {
                        steamReviewScores.map((reviewScore:string) => (
                            <li className={`
                                    transition-all hover:cursor-pointer
                                    ${selectedReviewScore === reviewScore ? "text-2xl font-bold" : "text-1xl hover:underline"}
                                `}
                                onClick={() => setSelectedReviewScore(reviewScore)}
                            >
                                {reviewScore}
                            </li>
                        ))
                    }
                </ul> */}

                <div className="flex flex-wrap justify-around">
                    {
                        games.filter((game:any) => game.release_date !== "" && game.steam_review.review_score_desc === selectedReviewScore).map((game:any) => (
                            <GameThumbnail game={game} key={game.id} />
                        ))
                    }
                </div>  

            </section>

        </LayoutWithAdSidebars>
    )
}