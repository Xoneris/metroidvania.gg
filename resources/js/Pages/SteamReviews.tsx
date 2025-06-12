import GameThumbnail from "@/Components/GameThumbnails";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function SteamReviews({games}:{games:any}) {

    const steamReviewTypes = ["Overwhelmingly Positive", "Very Positive", "Mostly Positive", "Positive", "Mixed"]

    return (
        <Layout>

            <Head title="All Games" />

            <section className="max-w-[1920px] m-auto flex flex-col p-4 gap-2 scroll-smooth">

            {/* {games.filter((game:any) => game.release_date !== "").length} */}
            {/* {games.filter((game:any) => game.release_date !== "" && game.steam_review.total_reviews > 500).length} */}

            {/* {games.map((game:any) => (
                <p>{game.steam_review.review_score_desc}</p>
            ))} */}


            {
                steamReviewTypes.map((type:string) => (
                    <>
                    <h1 className="border-b border-black">{type}</h1>
                    <div className="flex flex-wrap justify-around">
                    {
                        games.filter((game:any) => game.release_date !== "" && game.steam_review.review_score_desc === type).map((game:any) => (
                        // games.filter((game:any) => game.release_date !== "" && game.steam_review.total_reviews > 500 ).map((game:any) => (
                            <GameThumbnail game={game} key={game.id} />
                        ))
                    }
                    </div>  
                    </>

                ))
            }

            </section>

        </Layout>
    )
}