import { Head } from '@inertiajs/react';
import { GameData } from '@/types';
import LayoutWithAdSidebars from '@/Layouts/LayoutWithAdSidebars';
import GameThumbnail from '@/Components/GameThumbnails';
import AdComponents from '@/Components/AdComponent';
import useWindowSize from '@/hooks/useWindowSize';

export default function SinglePage({ games, title }:{games:GameData[], title:string}) {

    const { width, height } = useWindowSize()

    return (
        <>
            <Head title={title} />

            <LayoutWithAdSidebars noHeaderAd={true}>

                <section className="max-w-[1600px] w-full flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">{title}</h1>
                    <hr className="bg-black w-full h-[2px]"/>

                    {
                        width > 807
                        ? <AdComponents dataAdSlot="8519452290" adWidth="728px" adHeight="90px" />
                        : <AdComponents dataAdSlot="9027822404" adWidth="320px" adHeight="100px" />
                    }

                    <div className="w-full flex flex-wrap justify-around content-between">
                    {
                        games.map((game,index) => (
                            <>
                                <GameThumbnail game={game} key={game.id}/>
                                {
                                    (index+1) % 10 === 0
                                    ? width > 967
                                        ? null
                                        : width > 807
                                            ? <AdComponents dataAdSlot="8604046928" adWidth="728px" adHeight="90px" />
                                            : <AdComponents dataAdSlot="6692199453" adWidth="320px" adHeight="100px" />
                                    : null
                                }
                                
                            </>
                        ))
                    }
                    </div>
                </section>

            </LayoutWithAdSidebars>
        </>
    );
}
