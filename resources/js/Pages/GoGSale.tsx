import { Head } from '@inertiajs/react';
import { GameData } from '@/types';
import Layout from '@/Layouts/Layout';
import GameThumbnail from '@/Components/GameThumbnails';

export default function GoGSale({ games, title }:{games:GameData[], title:string}) {

    return (
        <>
            <Head title={title} />

            <Layout>
                <section className="max-w-[1920px] m-auto flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">{title}</h1>
                    <hr className="bg-black w-full h-[2px]"/>
                    <div className="w-full bg-mainOrange p-1 rounded-lg text-center">
                        Sale may vary for your country since developers can set different discounts for different countries.
                    </div>
                    <div className="w-full flex flex-wrap justify-around content-between">
                        {
                            games.sort((a,b) => (b.gog_discount ?? 0) - (a.gog_discount ?? 0)).map((game) => (
                                <GameThumbnail game={game} key={game.id}/>
                            ))
                        }
                    </div>
                </section>
            </Layout>
        </>
    )
}
