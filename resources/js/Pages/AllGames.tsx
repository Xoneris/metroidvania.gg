import GameThumbnail from "@/Components/GameThumbnails";
import Layout from "@/Layouts/Layout";
import { GameData } from "@/types";
import { Head } from "@inertiajs/react";


export default function ({games}:{games:GameData[]}) {

    let alphabet = [];
    let chr; 
 
    for (let i = 0; i < 26; i++) {
        chr = String.fromCharCode(65 + i);
        alphabet.push(chr);
    }

    return(
        <Layout>

            <Head title="All Games" />

            <section className="max-w-[1920px] m-auto flex flex-col p-4 gap-2 scroll-smooth">

                <h1 className="text-2xl">All Games</h1>
                <hr className="bg-black w-full h-[2px]"/>
                
                <ul className="flex m-auto gap-3">
                    <a href="#0-9">
                        <li className="p-2 border border-black bg-black text-mainOrange rounded-md transition-all hover:text-black hover:bg-mainOrange hover:cursor-pointer">
                            0-9
                        </li>
                    </a>
                    {
                        alphabet.map(letter => 
                            <a href={"#" + letter}>
                                <li key={letter} className="p-2 border border-black bg-black text-mainOrange rounded-md transition-all hover:text-black hover:bg-mainOrange hover:cursor-pointer">
                                    {letter}
                                </li>    
                            </a>
                    )}
                </ul>

                <h2 className="text-1xl font-bold"><a id="0-9">0-9</a></h2>
                <hr className="bg-black w-full h-[2px]"/>

                <div className="flex flex-wrap justify-around p-2">
                    {games.filter((game) => ['0','1','2','3','4','5','6','7','8','9'].includes(game.name[0])).map(game => (
                        <GameThumbnail game={game} key={game.id}/>
                    ))}
                </div> 

                {alphabet.map(letter => 
                    <>
                        <h2 className="text-1xl font-bold"><a id={letter}>{letter}</a></h2>
                        <hr className="bg-black w-full h-[2px]"/>
                        <div className="flex flex-wrap justify-around p-2">
                            {games.filter((game) => game.name[0] === letter).map(game => (
                                <GameThumbnail game={game} key={game.id}/>
                            ))}
                        </div>
                    </>    
                )}

            </section>
        </Layout>
    )
}