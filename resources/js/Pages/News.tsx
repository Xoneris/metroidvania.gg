import { Head, Link } from '@inertiajs/react';
import { TNews } from '@/types';
import LayoutWithAdSidebars from '@/Layouts/LayoutWithAdSidebars';
import { replaceMonthWithName } from "@/Utils/replaceMonthWithName";

export default function News({ newsfeed }:{newsfeed:TNews[]}) {

    return (
        <>
            {/* <Head>
                <title>{"Most wanted games"}</title>
                <meta name="description" content={`A list of most wanted games based on steam follower numbers`} />

                <meta property="og:title" content={"Most wanted games"}/>
                <meta property="og:description" content={`A list of most wanted games based on steam follower numbers`} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg/most-wanted"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + games.sort((a,b) => (b.followers ?? 0) - (a.followers ?? 0))[0].slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={"Most wanted games"}/>
                <meta name="twitter:description" content={`A list of most wanted games based on steam follower numbers`}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + games.sort((a,b) => (b.followers ?? 0) - (a.followers ?? 0))[0].slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head> */}

            <LayoutWithAdSidebars>
                <section className="max-w-[1920px] flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">News feed</h1>
                    <hr className="bg-black w-full h-[2px]"/>

                    <div className="w-full flex flex-col">
                        {
                            newsfeed?.map((news:TNews, index:number) => (
                                <div className={` ${index > 0 ? "py-2 border-t border-mainOrange": null} flex pb-2 items-center gap-2 text-sm lg:text-base`} key={index}>

                                <div className="w-full max-w-[400px] rounded-r-md overflow-hidden group">
                                    <Link href={"/Game/" + news?.slug}>
                                        <img src={"/storage/thumbnails/"+news?.slug+".jpg"} alt={news?.game + " thumbnail"} className="rounded-r-md transition-all group-hover:scale-[1.20] group-hover:cursor-pointer" />
                                    </Link>
                                </div>
                                <div className="flex flex-col lg:grow justify-around transition-all group-hover:pl-2">
                                    <div>
                                        <Link href={"/Game/" + news?.slug}>
                                            <h4 className="lg:text-xl text-mainOrange hover:underline hover:cursor-pointer">{news?.game}</h4>
                                        </Link>
                                    </div>
                                    <div className="h-32 flex flex-col justify-center">
                                        <p className="text-sm">{replaceMonthWithName(news?.created_at) + " - " + news?.created_at.slice(10, 16)}</p>
                                        <p className="min-w-[200px] ">
                                            {
                                                news?.type === "release_change"
                                                ? `New release date from ${news?.release_old} to ${news?.release_new}!`
                                                : news?.type === "demo_check"
                                                ? news?.has_demo === true
                                                        ? "Has a demo on steam now!"
                                                        : "No longer has a demo on steam!"
                                                        : news?.type === "new_thumbnail"
                                                        ? "Has a new thumbnail!"
                                                        : news?.type === "new_release"
                                                        ? "Has just released!"
                                                        : null
                                                    }
                                        </p>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                </section>
            </LayoutWithAdSidebars>
        </>
    )
}
