import { Head } from '@inertiajs/react';
import { GameData, FrontPageSectionGame } from '@/types';
import Layout from '@/Layouts/Layout';
import HomePageBanner from '@/Components/HomePageBanner';
import HomePageSection from '@/Components/HomePageSection';

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
        bannerSectionGames: GameData[],
        upcomingGames: FrontPageSectionGame[],
        recentlyReleased: GameData[],
        steamSale: GameData[] 
        gamesWithDemos: GameData[],
        earlyAccessGames: GameData[],  
        upcomingKickstarterGames: GameData[],
        releasingIn2025: GameData[],
        releasingIn2026: GameData[],
        releasingInTBD: GameData[],
        lastAddedGames: GameData[],
    }

) {

    return (
        <>
            <Head title="Home" />

            <Layout>

                <div className="w-full flex flex-col">

                    <HomePageBanner 
                        games={bannerSectionGames}
                    />

                    <div className='max-w-[1920px] w-full m-auto'>

                        <HomePageSection 
                            title="Coming Soon"
                            games={upcomingGames}
                            viewAll={""}
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

                    </div>
                </div>
            </Layout>
        </>
    );
}
