import DashboardLayout from "@/Layouts/DashboardLayout";
import { GameData } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";


export default function EditGames({games}:{games:GameData[]}) {

    const [search, setSearch] = useState<string>("")

    return (
        <DashboardLayout>

            <Head title="Edit Games"/>

            <h1 className="text-3xl">Edit Games - {games.length}</h1>

            <input type="text" placeholder="Search game..."
                className="w-1/2 rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
                // onClick={() => setEditGame(null)}
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
                        <tbody className="odd:bg-[#CCCCCC] [&>td]:p-2">
                            <td>
                                {game.name}
                            </td>
                            <td>
                                {game.release_window}
                            </td>
                            <td>
                                {
                                    game.release_date !== "0000-00-00"
                                    ? game.release_date
                                    : null
                                }
                            </td>
                            <td>
                                {game.demo}
                            </td>
                            <td>
                                {game.early_access}
                            </td>
                            <td>
                                {game.kickstarter_status}
                            </td>
                            <td>
                                {game.trailer}
                            </td>
                            <td>
                                Full Edit
                            </td>
                        </tbody>
                    ))
                }
            </table>

        </DashboardLayout>
    )
}