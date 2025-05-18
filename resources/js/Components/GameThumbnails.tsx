import { replaceMonthWithName } from '@/Utils/replaceMonthWithName';
import { FrontPageSectionGame, GameData } from '@/types';
import { Link, usePage } from "@inertiajs/react"

export default function GameThumbnail ({game}:{game:GameData|FrontPageSectionGame}) {

    // temporary fixed variable will fix later
    const noThumbnail:boolean = true

    const { url } = usePage()

    return (
        <Link href={"/Game/" + game.slug} key={game.id}>
            {
                noThumbnail 
                    ? <div 
                        className="group relative w-[322px] h-[152px] border border-black rounded-2xl m-1 transition-all hover:scale-110 hover:shadow-gameThumbnailShadow hover:z-10" 
                        title={game.name}
                    >
                        <img 
                            src={"/storage/thumbnails/" + game.slug + '.jpg'} 
                            alt={game.name} 
                            className="rounded-2xl"
                        />

                        <div className="absolute bottom-1 left-1 p-1 border rounded-md text-white border-black bg-black bg-opacity-80 transition-all group-hover:text-mainOrange flex flex-col">
                            <span className='text-xs'>Release date:</span>
                            <span className='text-sm'>

                            {
                                game.release_date === '' || game.release_date === null
                                ? game.release_window
                                : replaceMonthWithName(game.release_date)
                            }
                            </span>
                        </div>
                        {
                            game.early_access === true || game.early_access === 1 
                                ? <span className="absolute top-1 right-1 p-1 border rounded-md text-white border-black transition-all bg-black bg-opacity-80 group-hover:text-mainOrange">Early Access</span> 
                                : null
                        }
                        {/* <div className="hidden absolute top-0 bg-black bg-opacity-70 text-mainOrange text-sm rounded-2xl w-full h-full justify-center items-center group-hover:flex">
                            {game.description}
                        </div> */}

                        {
                            url === "/" && game.steam_discount
                            ? <span className="absolute bottom-1 right-1 p-1 border rounded-md font-bold text-green-900 border-green-900 bg-green-400 bg-opacity-80">
                                -{game.steam_discount}%
                            </span>
                            : url === "/steam-sale" && game.steam_discount 
                            ? <span className="absolute bottom-1 right-1 p-1 border rounded-md font-bold text-green-900 border-green-900 bg-green-400 bg-opacity-80">
                                -{game.steam_discount}%
                            </span>
                            : url === "/gog-sale" && game.gog_discount
                            ? <span className="absolute bottom-1 right-1 p-1 border rounded-md font-bold text-green-900 border-green-900 bg-green-400 bg-opacity-80">
                                -{game.gog_discount}%
                            </span>
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