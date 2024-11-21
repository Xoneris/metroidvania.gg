import { GameData } from "@/types";
import GameThumbnail from "./GameThumbnails";


export default function HomePageSection({title,games}:{title:string, games:GameData[]|null}) {

    return (
        <div className="w-full p-3">
            <h1 className="text-2xl">{title}</h1>
            <hr className="bg-black w-full h-[2px]"/>
            <div className="flex flex-wrap justify-around pt-3">
                {
                    games?.map((game:GameData) => (
                        <GameThumbnail game={game} key={game.id}/>
                    ))
                }
            </div>
        </div>
    )
}