import FullGameEdit from "@/Layouts/Components/Dashboard/FullGameEdit";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { GameData } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function SubmitGame ({games}:{games:any}) {
    
    const [fullGame, setFullGame] = useState<GameData>()
    const [fullEdit, setFullEdit] = useState<boolean>(false)
    const [gameIsAdded, setGameisAdded] = useState<number>(0)

    return (
        <DashboardLayout>
            
            <Head title="Submitted Games" />
            
            <h1 className="text-3xl">Submited Games</h1>

            {
                fullEdit 
                ? <>
                    <button 
                        className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                        onClick={() => {setFullEdit(false)}}
                    >
                        {"< Back"}
                    </button>
                    <FullGameEdit game={fullGame} editGame={undefined} submittedGame={true} />
                </>
                : <>
                    <div className="flex pl-1 gap-1 w-full border-b border-black">
                        <div 
                            className={`${gameIsAdded === 0 ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`}
                            onClick={() => setGameisAdded(0)}
                        >
                            Submitted Games
                        </div>
                        <div 
                            className={`${gameIsAdded === 1 ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`}
                            onClick={() => setGameisAdded(1)}
                        >
                            Added Games
                        </div>
                    </div>    
                    <table className="w-full">
                        <thead className="bg-black text-mainOrange font-bold">
                            <tr className="[&>td]:p-2">
                                <td>Name</td>
                                <td>Release Window</td>
                                <td>Release Date</td>
                                <td>Demo</td>
                                <td>Early Access</td>
                                <td>Kickstarter Status</td>
                                <td>Trailer</td>
                                {gameIsAdded === 0 ? <td>Edit</td> : null}
                            </tr>
                        </thead>
                    {
                        games.filter((game:GameData&{isAdded:number}) => game.isAdded === gameIsAdded).map((game:GameData) => (
                            <tbody 
                                className="odd:bg-[#CCCCCC] [&>td]:p-2" 
                                key={game.id}
                            >
                                <td>{game.name}</td>
                                <td>{game.release_window}</td>
                                <td>{game.release_date}</td>
                                <td>
                                    {
                                        game.demo === true || game.demo === 1
                                        ? "Yes"
                                        : "No"
                                    }
                                </td>
                                <td>
                                    {
                                        game.early_access === true || game.early_access === 1
                                        ? "Yes"
                                        : "No"
                                    }
                                </td>
                                <td>{game.kickstarter_status}</td>
                                <td>{game.trailer}</td>
                                {
                                    gameIsAdded === 0 
                                    ? <td>
                                        <button
                                            className="w-32 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                                            onClick={() => {
                                                setFullGame(game)
                                                setFullEdit(true)
                                            }}
                                            >
                                            Review Game
                                        </button>
                                    </td>
                                    : null
                                }
                            </tbody>
                        ))
                    }
                    </table>
                </>
            }
        </DashboardLayout>
    )
}