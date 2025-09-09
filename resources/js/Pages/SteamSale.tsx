import { Head } from '@inertiajs/react';
import { TGameThumbnail } from '@/types';
import GameThumbnail from '@/Components/GameThumbnails';
import LayoutWithAdSidebars from '@/Layouts/LayoutWithAdSidebars';

export default function SteamSale({ 
        games, 
        pageTitle,
        pageDescription,
    }:{
        games:TGameThumbnail[],
        pageTitle:string
        pageDescription:string
}) {

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle}/>
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[0].slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={pageTitle}/>
                <meta name="twitter:description" content={pageDescription}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[0].slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head>

            <LayoutWithAdSidebars>
                <section className="max-w-[1600px] w-full flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">{pageTitle}</h1>
                    <hr className="bg-black w-full h-[2px]"/>

                    <div className="w-full bg-mainOrange p-1 rounded-lg text-center">
                        Sale may vary for your country since developers can set different discounts for different countries.
                    </div>

                    <div className="w-full flex flex-wrap justify-around content-between">
                        {
                            games.sort((a,b) => (b.steam_discount ?? 0) - (a.steam_discount ?? 0)).map((game) => (
                                <GameThumbnail game={game} key={game.id}/>
                            ))
                        }
                    </div>
                </section>
            </LayoutWithAdSidebars>
        </>
    );
}
