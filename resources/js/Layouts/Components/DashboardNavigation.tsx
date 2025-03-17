import { Link, usePage } from "@inertiajs/react"

export default function DashboardNavigation() {

    const { url } = usePage()

    return (
        <nav className="w-[300px] min-h-full bg-[#111111] text-[#999999] p-2 flex flex-col items-center">

            <h1 className="text-2xl">Dashboard</h1>

            <div className="flex flex-col w-full p-2 gap-2">
                   
                <Link href="/Dashboard">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Home
                    </p>
                </Link>
                <Link href="/Dashboard/AddGame">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/AddGame" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Add new Game
                    </p>
                </Link>
                <Link href="/Dashboard/EditGames">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/EditGames" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Edit Games
                    </p>
                </Link>
                <Link href="/Dashboard/SubmittedGames">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/SubmittedGames" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Submitted Games
                    </p>
                </Link>
                <Link href="/Dashboard/Reports">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/Reports" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Reports
                    </p>
                </Link>
                <Link href="/Dashboard/Contact">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/Contact" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Contact
                    </p>
                </Link>

                <Link href={route('logout')} method="post" as="button">
                    <p className="border-b text-lg transition-all border-[#999999] text-left hover:text-mainOrange hover:border-mainOrange hover:pl-2">
                        Logout
                    </p>
                </Link>

            </div>
        </nav>
    )
}