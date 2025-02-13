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
        gamesWithDemos,
        earlyAccessGames,
        upcomingKickstarterGames,
        releasingIn2024,
        releasingIn2025,
        releasingInTBD,
        lastAddedGames,
    }
    :
    { 
        bannerSectionGames: GameData[],
        upcomingGames: FrontPageSectionGame[],
        recentlyReleased: GameData[], 
        gamesWithDemos: GameData[],
        earlyAccessGames: GameData[],  
        upcomingKickstarterGames: GameData[],
        releasingIn2024: GameData[],
        releasingIn2025: GameData[],
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
                        />
                        <HomePageSection 
                            title="Recently Released"
                            games={recentlyReleased}
                        />
                        <HomePageSection 
                            title="Games with Demos"
                            games={gamesWithDemos}
                        />
                        <HomePageSection 
                            title="In Early Access"
                            games={earlyAccessGames}
                        />
                        <HomePageSection 
                            title="Upcoming Kickstarters"
                            games={upcomingKickstarterGames}
                        />
                        <HomePageSection 
                            title="Releasing in 2024"
                            games={releasingIn2024}
                        />
                        <HomePageSection 
                            title="Releasing in 2025"
                            games={releasingIn2025}
                        />
                        <HomePageSection 
                            title="Releasing in TBD"
                            games={releasingInTBD}
                        />
                        <HomePageSection 
                            title="Recently Added"
                            games={lastAddedGames}
                        />

                    </div>
                </div>
            </Layout>
        </>
    );
}
