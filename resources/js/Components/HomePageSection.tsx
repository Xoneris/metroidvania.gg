import type { TGameThumbnail, GameData } from "@/types";
import GameThumbnail from "./GameThumbnails";
import { Link } from "@inertiajs/react";


export default function HomePageSection({title,games,viewAll}:{title:string, games:TGameThumbnail[]|null, viewAll:string}) {

    return (
        <div className="w-full p-3">
            <div className="flex gap-3 items-end">
                <h1 className="text-2xl">{title}</h1>
                {
                    viewAll !== ""
                    ? <Link href={viewAll}>
                        <p className="text-sm text-[#333333] hover:underline hover:cursor-pointer">
                            [view All]
                        </p>
                    </Link>
                    : null
                }
            </div>
            <hr className="bg-black w-full h-[2px]"/>
            <div className="flex flex-wrap justify-around pt-3">
                {
                    games?.map((game:TGameThumbnail) => (
                        <GameThumbnail game={game} key={game.id}/>
                    ))
                }
            </div>
        </div>
    )
}