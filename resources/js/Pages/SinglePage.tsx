import { Head } from '@inertiajs/react';
import { TGameThumbnail } from '@/types';
import LayoutWithAdSidebars from '@/Layouts/LayoutWithAdSidebars';
import GameThumbnail from '@/Components/GameThumbnails';
import AdComponents from '@/Components/AdComponent';
import useWindowSize from '@/hooks/useWindowSize';
import ClientOnly from '@/Components/ClientOnly';
import { useEffect } from 'react';

export default function SinglePage({ 
        games,
        pageTitle,
        pageDescription,
    }:{
        games:TGameThumbnail[], 
        pageTitle:string,
        pageDescription:string,
    }) {

    const { width, height } = useWindowSize()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />

                <meta property="og:title" content={pageTitle}/>
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[0]?.slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={pageTitle}/>
                <meta name="twitter:description" content={pageDescription}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[0]?.slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head>

            <LayoutWithAdSidebars noHeaderAd={true}>

                <section className="max-w-[1600px] w-full flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">{pageTitle}</h1>
                    <hr className="bg-black w-full h-[2px]"/>

                    <ClientOnly>
                        {
                            width > 807
                            ? <AdComponents dataAdSlot="8519452290" adWidth="728px" adHeight="90px" />
                            : <AdComponents dataAdSlot="9027822404" adWidth="320px" adHeight="100px" />
                        }
                    </ClientOnly>

                    <div className="w-full flex flex-wrap justify-around content-between">
                    {
                        games?.length > 0 
                        ? games.map((game,index) => (
                            <>
                                <GameThumbnail game={game} key={game.id}/>
                                <ClientOnly>
                                    {
                                        (index+1) % 10 === 0
                                        ? width > 967
                                            ? null
                                            : width > 807
                                                ? <AdComponents dataAdSlot="8604046928" adWidth="728px" adHeight="90px" />
                                                : <AdComponents dataAdSlot="6692199453" adWidth="320px" adHeight="100px" />
                                        : null
                                    }
                                </ClientOnly>
                            </>
                        ))
                        : <h3 className="text-xl">Nothing here just yet</h3>
                    }
                    </div>
                </section>

            </LayoutWithAdSidebars>
        </>
    );
}
