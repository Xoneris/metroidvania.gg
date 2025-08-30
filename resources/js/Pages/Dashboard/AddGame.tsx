import FullGameEdit from "@/Layouts/Components/Dashboard/FullGameEdit";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { GameData } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AddGame ({importedGame}:{importedGame: GameData}) {



    const { data, setData, post} = useForm({link: ""})
    const [isImport, setIsImport] = useState(false)
    const [isManualAdd, setIsManualAdd] = useState(false)

    const handleImport = async (e:any) => {
        
        e.preventDefault()

        console.log("submitting import")

        post("/game/import")
        
        console.log(data)
    }

    return (
        <DashboardLayout>
            
            <Head title="Add new Game" />
            
            <h1 className="text-3xl">Add Game</h1>

            {
                importedGame
                ? <FullGameEdit 
                    game={importedGame} 
                    editGame={false} 
                    submittedGame={undefined} 
                />
                : isImport
                ? <form className="flex gap-2 items-center" onSubmit={handleImport}>
                    <h2 className="min-w-[150px]">Import from Steam:</h2>
                    <input type="text" className="w-full rounded-md" onChange={(e) => setData("link", e.target.value)}  />
                    <button className="p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange">Import</button>
                </form>
                : isManualAdd
                ? <FullGameEdit 
                    game={undefined}
                    editGame={false}
                    submittedGame={undefined}
                />
                : <div className="flex gap-2">
                <button 
                    className="p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                    onClick={() => setIsImport(true)}
                >Import Game
                </button>
                <button 
                    className="p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                    onClick={() => setIsManualAdd(true)}
                >Add Manually</button>
            </div>
            }

            

        </DashboardLayout>
    )
}