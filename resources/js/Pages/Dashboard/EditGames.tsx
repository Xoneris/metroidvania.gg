import FullGameEdit from "@/Layouts/Components/Dashboard/FullGameEdit";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { GameData } from "@/types";
import { replaceMonthWithName } from "@/Utils/replaceMonthWithName";
import { Head } from "@inertiajs/react";
import { useState } from "react";


export default function EditGames({games}:{games:GameData[]}) {

    const [search, setSearch] = useState<string>("")
    const [editGame, setEditGame] = useState<number|undefined>(undefined)

    const [fullEdit, setFullEdit] = useState<boolean>(false)
    const [fullGame, setFullGame] = useState<GameData>()

    return (
        <DashboardLayout>

            <Head title="Edit Games"/>

            <h1 className="text-3xl">Edit Games - {fullEdit ? fullGame?.name : games.length}</h1>
        
            {
                fullEdit 
                ? <>
                    <button 
                        className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                        onClick={() => setFullEdit(false)}
                    >
                        {"< Back"}
                    </button>
                    <FullGameEdit game={fullGame} editGame={true} />
                </>
                : <>

            <input type="text" placeholder="Search game..."
                className="w-1/2 rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
                onClick={() => setEditGame(undefined)}
                />

            <table className="w-full">
                <thead className="bg-black text-mainOrange font-bold [&>td]:p-2">
                    <td>Name</td>
                    <td>Release Window</td>
                    <td>Release Date</td>
                    <td>Demo</td>
                    <td>Early Access</td>
                    <td>Kickstarter Status</td>
                    <td>Trailer</td>
                    <td>Edit</td>
                </thead>
                {
                    games.filter(game => game.name.toLowerCase().includes(search)).map((game:GameData) => (
                        <tbody className="odd:bg-[#CCCCCC] [&>td]:p-2" onClick={() => {setEditGame(game.id)}} key={game.id}>
                            <td>
                                {
                                    editGame === game.id
                                    ? <input type="text" value={game.name} className="w-full rounded-lg" />
                                    : game.name
                                }
                            </td>
                            <td>
                                {
                                    editGame === game.id
                                    ? <input type="text" value={game.release_window} placeholder="Release Window" className="w-full rounded-lg" />
                                    : game.release_window
                                }
                            </td>
                            <td>
                                {
                                    editGame === game.id
                                    ? <input type="date" value={game.release_date} className="w-full rounded-lg" />
                                    : game.release_date !== "0000-00-00"
                                    ? replaceMonthWithName(game.release_date)
                                    : null
                                }
                            </td>
                            <td>
                                {
                                    editGame === game.id
                                    ? <select className="w-full rounded-lg">
                                        <option value={game.demo ? "yes" : "no"}>{game.demo ? "Yes" : "No"}</option>
                                        <option value={game.demo ? "no" : "yes"}>{game.demo ? "No" : "Yes"}</option>
                                    </select>
                                    : game.demo === 1 || game.demo === true 
                                    ? "Yes"
                                        : "No"
                                    }
                            </td>
                            <td>
                                {
                                    editGame === game.id
                                    ? <select className="w-full rounded-lg">
                                        <option value={game.early_access === 1 ? "yes" : "no"}>{game.early_access === 1 ? "Yes" : "No"}</option>
                                        <option value={game.early_access === 1 ? "no" : "yes"}>{game.early_access === 1 ? "No" : "Yes"}</option>
                                    </select>
                                    : game.early_access === 1 || game.early_access === true
                                    ? "Yes"
                                    : "No"
                                }
                            </td>
                            <td>
                                {
                                    editGame === game.id
                                    ? <input type="text" value={game.kickstarter_status} placeholder="Kickstarter status" className="w-full rounded-lg" />
                                    : game.kickstarter_status
                                }
                            </td>
                            <td>
                                {
                                    editGame === game.id
                                    ? <input type="text" value={game.trailer} className="w-full rounded-lg" />
                                    : game.trailer
                                }
                            </td>
                            <td>
                                {
                                    <button 
                                    onClick={() => {
                                        setFullEdit(true)
                                        setFullGame(game)
                                    }}
                                    >
                                            Full Edit!
                                        </button>
                                    
                                }
                            </td>
                        </tbody>
                    ))
                }
            </table>
                </>
}


            {/* { fullEdit && (
                <FullGameEdit 
                    game={fullGame}
                    setFullEdit={setFullEdit}
                 />
            )} */}

        </DashboardLayout>
    )
}