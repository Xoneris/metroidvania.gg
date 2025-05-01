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
                    <FullGameEdit game={fullGame} editGame={true} />
                </>
                : <>
                {
                    games.map((game:GameData) => (
                        <div className="flex justify-between">
                            <p>{game.name}</p>
                            <button
                                onClick={() => {
                                    setFullGame(game)
                                    setFullEdit(true)
                                }}
                            >

                            </button>
                        </div>
                    ))
                }
                </>

            }

        </DashboardLayout>
    )
}