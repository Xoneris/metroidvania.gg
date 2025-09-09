import { Head } from '@inertiajs/react';
import type { THomeBannerSectionGames,TGameThumbnail } from '@/types';
import useWindowSize from '@/hooks/useWindowSize';
import Layout from '@/Layouts/Layout';
import HomePageBanner from '@/Components/HomePageBanner';
import HomePageSection from '@/Components/HomePageSection';
import AdComponents from '@/Components/AdComponent';

export default function Home(
    { 
        bannerSectionGames,
        upcomingGames,
        recentlyReleased,
        steamSale, 
        gamesWithDemos,
        earlyAccessGames,
        upcomingKickstarterGames,
        releasingIn2025,
        releasingIn2026,
        releasingInTBD,
        lastAddedGames,
    }:{ 
        bannerSectionGames: THomeBannerSectionGames[],
        upcomingGames: TGameThumbnail[],
        recentlyReleased: TGameThumbnail[],
        steamSale: TGameThumbnail[] 
        gamesWithDemos: TGameThumbnail[],
        earlyAccessGames: TGameThumbnail[],  
        upcomingKickstarterGames: TGameThumbnail[],
        releasingIn2025: TGameThumbnail[],
        releasingIn2026: TGameThumbnail[],
        releasingInTBD: TGameThumbnail[],
        lastAddedGames: TGameThumbnail[],
    }

) {

    const { width, height } = useWindowSize();

    return (
        <>
            <Head>
                <title>{"Home"}</title>
                <meta name="description" content={"The #1 Information hub for Metroidvania fans. Find the latest and greatest Metroidvanias!"} />

                <meta property="og:title" content={"Metroidvania.GG - Home"}/>
                <meta property="og:description" content={"The #1 Information hub for Metroidvania fans. Find the latest and greatest Metroidvanias!"} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + bannerSectionGames[0].slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={"Metroidvania.GG - Home"}/>
                <meta name="twitter:description" content={"The #1 Information hub for Metroidvania fans. Find the latest and greatest Metroidvanias!"}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + bannerSectionGames[0].slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head>

            <Layout>

                <div className="w-full flex flex-col">

                    <HomePageBanner 
                        games={bannerSectionGames}
                    />

                    <div className='max-w-[1920px] w-full m-auto'>

                        {
                            // width > 1000
                            // ? <AdComponents dataAdSlot="1495713096" adWidth="970px" adHeight="90px"/>
                            // : 
                            width > 770
                            ? <AdComponents dataAdSlot="9971178537" adWidth="728px" adHeight="90px"/>
                            : <AdComponents dataAdSlot="2384332553" adWidth="320px" adHeight="100px"/>
                        }

                        <HomePageSection 
                            title="Coming Soon"
                            games={upcomingGames}
                            viewAll={"/coming-soon"}
                        />

                        <HomePageSection 
                            title="Recently Released"
                            games={recentlyReleased}
                            viewAll={"/Released"}
                        />

                        <HomePageSection 
                            title="Steam Games on Sale"
                            games={steamSale}
                            viewAll={"/steam-sale"}
                        />

                        {
                            // width > 1000
                            // ? <AdComponents dataAdSlot="1495713096" adWidth="970px" adHeight="90px"/>
                            // : 
                            width > 770
                            ? <AdComponents dataAdSlot="9971178537" adWidth="728px" adHeight="90px"/>
                            : <AdComponents dataAdSlot="2384332553" adWidth="320px" adHeight="100px"/>
                        }

                        <HomePageSection 
                            title="Games with Demos"
                            games={gamesWithDemos}
                            viewAll={"/Demos"}
                        />

                        <HomePageSection 
                            title="In Early Access"
                            games={earlyAccessGames}
                            viewAll={"/EarlyAccess"}
                        />
                        <HomePageSection 
                            title="Upcoming Kickstarters"
                            games={upcomingKickstarterGames}
                            viewAll={"/UpcomingKickstarters"}
                        />

                        {
                            // width > 1000
                            // ? <AdComponents dataAdSlot="1495713096" adWidth="970px" adHeight="90px"/>
                            // : 
                            width > 770
                            ? <AdComponents dataAdSlot="9971178537" adWidth="728px" adHeight="90px"/>
                            : <AdComponents dataAdSlot="2384332553" adWidth="320px" adHeight="100px"/>
                        }

                        <HomePageSection 
                            title="Releasing in 2025"
                            games={releasingIn2025}
                            viewAll={"/2025"}
                        />
                        <HomePageSection 
                            title="Releasing in 2026"
                            games={releasingIn2026}
                            viewAll={"/2026"}
                        />

                        <HomePageSection 
                            title="Releasing in TBD"
                            games={releasingInTBD}
                            viewAll={"/TBD"}
                        />
                        <HomePageSection 
                            title="Recently Added"
                            games={lastAddedGames}
                            viewAll={""}
                        />

                        {
                            // width > 1000
                            // ? <AdComponents dataAdSlot="1495713096" adWidth="970px" adHeight="90px"/>
                            // : 
                            width > 770
                            ? <AdComponents dataAdSlot="9971178537" adWidth="728px" adHeight="90px"/>
                            : <AdComponents dataAdSlot="2384332553" adWidth="320px" adHeight="100px"/>
                        }

                    </div>
                </div>
            </Layout>
        </>
    );
}
