import FullGameEdit from "@/Layouts/Components/Dashboard/FullGameEdit";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

export default function AddGame () {

    

    return (
        <DashboardLayout>
            
            <Head title="Add new Game" />
            
            <h1 className="text-3xl">Add Game</h1>

            <FullGameEdit game={undefined} editGame={false} submittedGame={undefined} />

        </DashboardLayout>
    )
}