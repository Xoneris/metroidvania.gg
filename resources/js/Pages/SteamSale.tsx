import { Head } from '@inertiajs/react';
import { GameData } from '@/types';
import GameThumbnail from '@/Components/GameThumbnails';
import LayoutWithAdSidebars from '@/Layouts/LayoutWithAdSidebars';

export default function SteamSale({ games, title }:{games:GameData[], title:string}) {

    return (
        <>
            <Head title={title} />

            <LayoutWithAdSidebars>
                <section className="max-w-[1600px] w-full flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">{title}</h1>
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
