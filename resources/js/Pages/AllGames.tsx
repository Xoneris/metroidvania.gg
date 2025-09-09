import AdComponents from "@/Components/AdComponent";
import GameThumbnail from "@/Components/GameThumbnails";
import useWindowSize from "@/hooks/useWindowSize";
import LayoutWithAdSidebars from "@/Layouts/LayoutWithAdSidebars";
import { TGameThumbnail } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";


export default function ({games}:{games:TGameThumbnail[]}) {

    let alphabet = [];
    let chr; 
 
    for (let i = 0; i < 26; i++) {
        chr = String.fromCharCode(65 + i);
        alphabet.push(chr);
    }

    const [noThumbnail, setNoThumbnail] = useState<boolean>(false)
    const { width, height } = useWindowSize()

    return(
        <LayoutWithAdSidebars>

            <Head>
                <title>{"All Games"}</title>
                <meta name="description" content={"All Metroidvania games that are currently in the database of Metroidvania.GG"} />

                <meta property="og:title" content={"All Games"}/>
                <meta property="og:description" content={"All Metroidvania games that are currently in the database of Metroidvania.GG"} />
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={"https://metroidvania.gg/AllGames"} />
                <meta property="og:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[(Math.floor(Math.random() * games.length))].slug + ".jpg"} />
                <meta property="og:site_name" content="Metroidvania.GG"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={"All Games"}/>
                <meta name="twitter:description" content={"All Metroidvania games that are currently in the database of Metroidvania.GG"}/>
                <meta name="twitter:image" content={"https://metroidvania.gg/storage/thumbnails/" + games[(Math.floor(Math.random() * games.length))].slug + ".jpg"}/>
                <meta name="twitter:site" content="@metroidvania_gg"/>
            </Head>

            <section className="max-w-[1920px] w-full flex flex-col p-4 gap-2 scroll-smooth">

                <h1 className="text-2xl">All Games</h1>
                <hr className="bg-black w-full h-[2px]"/>

                {/* <div className="flex gap-2 border border-black rounded-lg p-2">
                    <div className="grow">
                        <h2>Development Status</h2>
                        <hr className="bg-black w-full h-[2px]"/>
                        <ul>
                            <li>Released</li>
                            <li>In Early Access</li>
                            <li>In Development</li>
                        </ul>
                    </div>
                    <div className="grow">
                        <h2>Platforms</h2>
                        <hr className="bg-black w-full h-[2px]"/>
                        <ul>
                            <li>Steam</li>
                            <li>Good Old Games</li>
                            <li>Epic Games</li>
                            <li>Playstation</li>
                            <li>Xbox</li>
                            <li>Nintendo Switch</li>
                        </ul>
                    </div>
                </div> */}

                <ul className="flex flex-wrap justify-center m-auto gap-3">
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

                {/* <button
                    onClick={() => setNoThumbnail(false)}
                >
                    Show Thumbnails
                </button> */}

                <h2 className="text-1xl font-bold"><a id="0-9">0-9</a></h2>
                <hr className="bg-black w-full h-[2px]"/>

                <div className="flex flex-wrap justify-around p-2">
                    {games.filter((game) => ['0','1','2','3','4','5','6','7','8','9'].includes(game.name[0])).map(game => (
                        <GameThumbnail game={game} key={game.id} noThumbnail={noThumbnail}/>
                    ))}
                </div> 

                {alphabet.map((letter,index) => 
                    <>
                        <h2 className="text-1xl font-bold"><a id={letter}>{letter}</a></h2>
                        <hr className="bg-black w-full h-[2px]"/>
                        <div className="flex flex-wrap justify-around p-2">
                            {
                                games.filter((game) => game.name[0] === letter).map(game => (
                                    <GameThumbnail game={game} key={game.id} noThumbnail={noThumbnail}/>
                                ))
                            }
                        </div>
                        {
                            (index+1) % 3 === 0
                            ? width > 967
                                ? null
                                : width > 807
                                    ? <AdComponents dataAdSlot="8604046928" adWidth="728px" adHeight="90px" />
                                    : <AdComponents dataAdSlot="6692199453" adWidth="320px" adHeight="100px" />
                            : null
                        }
                    </>    
                )}

            </section>
        </LayoutWithAdSidebars>
    )
}