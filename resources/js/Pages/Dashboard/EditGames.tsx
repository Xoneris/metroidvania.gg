import FullGameEdit from "@/Layouts/Components/Dashboard/FullGameEdit";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { GameData } from "@/types";
import { replaceMonthWithName } from "@/Utils/replaceMonthWithName";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";


export default function EditGames({games}:{games:GameData[]}) {

    const [search, setSearch] = useState<string>("")
    const [editGame, setEditGame] = useState<number|undefined>(undefined)

    const [allGames, setAllGames] = useState<GameData[]>(games)

    const [fullEdit, setFullEdit] = useState<boolean>(false)
    const [fullGame, setFullGame] = useState<GameData>()

    const {data, setData, patch, errors, setError} = useForm<any>({
        name: '',
        release_date: '',
        release_window: '',
        demo: 0,
        early_access: 0,
        kickstarter_status: '',
        trailer: '',
    })

    const handleClickOnRow = (game:GameData) => {
         
        if(editGame !== game.id) {
            setEditGame(game.id)
            setData({
                'name': game.name,
                'release_date': game.release_date,
                'release_window': game.release_window,
                'demo': game.demo,
                'early_access': game.early_access,
                'kickstarter_status': game.kickstarter_status,
                'trailer': game.trailer,
            }) 
        }   
    }

    const updateGame = () => {
        patch(`/Game/${editGame}/update`, data)

        // setAllGames(allGames.map(game => 
        //     game.name === data.name 
        //     ? {
        //         ...game, 
        //         name: data.name,
        //         release_date: data.release_date,
        //         release_window: data.release_window,
        //         demo: data.demo,
        //         early_access: data.early_access,
        //         kickstarter_status: data.kickstarter_status,
        //         trailer: data.trailer,
        //     }
        //     : game
        // ))
    }

    return (
        <DashboardLayout>

            <Head title="Edit Games"/>

            <h1 className="text-3xl">Edit Games - {fullEdit ? fullGame?.name : games.length}</h1>
        
            {
                fullEdit 
                ? <>
                    <button 
                        className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                        onClick={() => {
                            setFullEdit(false)
                            setSearch("")
                            setEditGame(undefined)
                        }}
                    >
                        {"< Back"}
                    </button>
                    <FullGameEdit game={fullGame} editGame={true} submittedGame={undefined} />
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
                            allGames.filter(game => game.name.toLowerCase().includes(search)).map((game:GameData) => (
                                <tbody 
                                    className="odd:bg-[#CCCCCC] [&>td]:p-2" 
                                    onClick={() => handleClickOnRow(game)} 
                                    key={game.id}
                                >
                                    <td>
                                        {
                                            editGame === game.id
                                            ? <input 
                                                type="text" 
                                                className="w-full rounded-lg" 
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                onKeyUp={(e) => (e.key === "Enter" ? updateGame() : null)}
                                            />
                                            : game.name
                                        }
                                    </td>
                                    <td>
                                        {
                                            editGame === game.id
                                            ? <input 
                                                type="text" 
                                                className="w-full rounded-lg" 
                                                placeholder="Release Window" 
                                                value={data.release_window}
                                                onChange={(e) => setData('release_window', e.target.value)} 
                                                onKeyUp={(e) => (e.key === "Enter" ? updateGame() : null)}
                                            />
                                            : game.release_window
                                        }
                                    </td>
                                    <td>
                                        {
                                            editGame === game.id
                                            ? <input 
                                                type="date" 
                                                className="w-full rounded-lg" 
                                                value={data.release_date}
                                                onChange={(e) => setData('release_date', e.target.value)} 
                                                onKeyUp={(e) => (e.key === "Enter" ? updateGame() : null)}
                                            />
                                            : game.release_date === null || game.release_date === ''
                                                ? null
                                                : replaceMonthWithName(game.release_date)
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
                                            ? <input 
                                                type="text" 
                                                className="w-full rounded-lg" 
                                                placeholder="Kickstarter status" 
                                                value={data.kickstarter_status}
                                                onChange={(e) => setData('kickstarter_status', e.target.value)} 
                                                onKeyUp={(e) => (e.key === "Enter" ? updateGame() : null)}
                                            />
                                            : game.kickstarter_status
                                        }
                                    </td>
                                    <td>
                                        {
                                            editGame === game.id
                                            ? <input 
                                                type="text" 
                                                className="w-full rounded-lg" 
                                                value={data.trailer}
                                                onChange={(e) => setData('trailer', e.target.value)} 
                                                onKeyUp={(e) => (e.key === "Enter" ? updateGame() : null)}
                                            />
                                            : game.trailer
                                        }
                                    </td>
                                    <td>
                                        {
                                            <button
                                                className="w-20 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                                                onClick={() => {
                                                    setFullEdit(true)
                                                    setFullGame(game)
                                                }}
                                            >
                                                Full Edit
                                            </button>
                                            
                                        }
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