import { replaceMonthWithName } from '@/Utils/replaceMonthWithName';
import { GameData } from '@/types';
import { Link, useRemember } from "@inertiajs/react"

export default function GameThumbnail ({game}:{game:GameData}) {

    // temporary fixed variable
    const noThumbnail:boolean = true

    return (
        <Link href={"/" + game.slug} key={game.id}>
            {
                noThumbnail 
                    ? <div className="relative w-[322px] h-[152px] border border-black rounded-2xl m-1 group transition-all hover:scale-110 hover:shadow-gameThumbnailShadow hover:z-10" title={game.name}>
                        <img src={"/assets/thumbnails/" + game.slug + '.jpg'} alt={game.name} className="rounded-2xl"  />
                        <span className="absolute bottom-1 left-1 p-1 border rounded-md text-white border-black bg-black bg-opacity-80 transition-all group-hover:text-mainOrange">
                            {game.release_date !== "0000-00-00" ? replaceMonthWithName(game.release_date) : game.release_window}
                        </span>
                        {
                            game.early_access === 1 
                                ? <span className="absolute top-1 right-1 p-1 border rounded-md text-white border-black transition-all bg-black bg-opacity-80 group-hover:text-mainOrange">Early Access</span> 
                                : null
                        }
                    </div>
                    : <div className="Game-NoThumbnail">
                        {game.name}
                    </div>
            }
        </Link>
    )
}