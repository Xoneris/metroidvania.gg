import { Head } from '@inertiajs/react';
import { GameData } from '@/types';
import Layout from '@/Layouts/Layout';
import GameThumbnail from '@/Components/GameThumbnails';

export default function Demos({ gamesWithDemos }:any) {

    const games:GameData[] = gamesWithDemos.original

    return (
        <>
            <Head title="Metroidvanias with Demos" />

            <Layout>
                <section className="max-w-[1920px] m-auto flex flex-col p-4 gap-2">
                    <h1 className="text-2xl">Games with Demos</h1>
                    <hr className="bg-black w-full h-[2px]"/>
                    <div className="w-full flex flex-wrap justify-around content-between">
                    {
                        games.map((game:GameData) => (
                            <GameThumbnail game={game} key={game.id}/>
                        ))
                    }
                    </div>
                </section>
            </Layout>
        </>
    );
}
