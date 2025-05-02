import FullGameEdit from "@/Layouts/Components/Dashboard/FullGameEdit";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { GameData } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function SubmitGame ({games}:{games:any}) {
    
    const [fullGame, setFullGame] = useState<GameData>()
    const [fullEdit, setFullEdit] = useState<boolean>(false)

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
                                <td>Edit</td>
                            </tr>
                        </thead>
                {
                    games.map((game:GameData) => (
                        <tbody 
                            className="odd:bg-[#CCCCCC] [&>td]:p-2" 
                            key={game.id}
                        >
                            <td>{game.name}</td>
                            <td>{game.release_window}</td>
                            <td>{game.release_date}</td>
                            <td>{game.demo}</td>
                            <td>{game.early_access}</td>
                            <td>{game.kickstarter_status}</td>
                            <td>{game.trailer}</td>
                            <td>
                                <button
                                    className="w-20 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                                    onClick={() => {
                                        setFullGame(game)
                                        setFullEdit(true)
                                    }}
                                >
                                    Review Game
                                </button>
                            </td>
                        </tbody>
                    ))
                }
                    </table>
                </>

            }

        </DashboardLayout>
    )
}