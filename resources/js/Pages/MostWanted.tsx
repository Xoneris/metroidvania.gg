import { Head } from '@inertiajs/react';
import { GameData } from '@/types';
import LayoutWithAdSidebars from '@/Layouts/LayoutWithAdSidebars';

export default function MostWanted({ games }:{games:GameData[]}) {

    return (
        <>
            <Head>
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
            </Head>

            <LayoutWithAdSidebars>
                <section className="max-w-[1920px] flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">Most Wanted Games</h1>
                    <hr className="bg-black w-full h-[2px]"/>

                    <div className="w-full flex flex-wrap ">
                        {
                            games.sort((a,b) => (b.followers ?? 0) - (a.followers ?? 0)).map((game,index) => (
                                <div className="flex w-1/2 items-center py-2 gap-2">
                                    <p className="text-2xl w-[40px]">{index+1}.)</p>
                                    <img 
                                        src={"/storage/thumbnails/" + game.slug + ".jpg"} 
                                        alt={game.name} 
                                        loading="lazy"
                                        className="rounded-2xl bg-[#ccc] w-[322px] h-[152px] border border-black    "
                                    />
                                    <div className="flex flex-col grow">
                                        <h2 className="text-2xl ">{game.name}</h2>
                                        <p>Developer: {game.developer}</p>
                                        <p>Release date: {game.release_date ? game.release_date : game.release_window}</p>
                                        <p>Has demo: {game.demo === 1 ? "Yes" : "No"}</p>
                                        {/* <div className="flex">
                                            <a href={game.steam} target="_blank">
                                                <img 
                                                    src="/assets/icons/playstation.png" 
                                                    className="w-8 transition-all hover:scale-125" 
                                                    alt="Playstation Logo" 
                                                />
                                            </a>
                                        </div> */}
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
