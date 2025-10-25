import { Link, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"

export default function DashboardNavigation() {

    const { url } = usePage()
    const [isData, setIsData] = useState({
        reports: 0,
        submits: 0,
    })
    // const BASE_API_URL = "https://localhost:8000/api" 
    const BASE_API_URL = "https://metroidvania.gg/api" 

    useEffect(() => {

        async function fetchData () {
            const res = await fetch(BASE_API_URL + '/dashboard/notifications')
            const data = await res.json()

            setIsData(data)
        }

        fetchData()

    },[])

    return (
        <nav className="min-w-[300px] min-h-full bg-[#111111] text-[#999999] p-2 flex flex-col items-center">

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
                <Link href="/Dashboard/SubmitGames">
                    <p className={`
                        border-b text-lg transition-all flex justify-between
                        ${url === "/Dashboard/SubmitGames" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        <span>
                            Submitted Games
                        </span>
                        {
                            isData?.submits > 0
                            ? <span className="min-w-7 text-sm rounded-full bg-mainOrange text-black flex justify-center items-center">
                                {isData?.submits}
                            </span>
                            : null
                        }
                    </p>
                </Link>
                <Link href="/Dashboard/Reports">
                    <p className={`
                        border-b text-lg transition-all flex justify-between
                        ${url === "/Dashboard/Reports" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        <span>
                            Reports
                        </span>
                        {
                            isData?.reports > 0
                            ? <span className="min-w-7 text-sm rounded-full bg-mainOrange text-black flex justify-center items-center">
                                {isData?.reports}
                            </span>
                            : null
                        }
                    </p>
                </Link>
                <Link href="/Dashboard/ad-manager">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/ad-manager" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Ad Manager
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
                <Link href="/Dashboard/demo-check">
                    <p className={`
                        border-b text-lg transition-all 
                        ${url === "/Dashboard/demo-check" 
                            ? "text-mainOrange border-mainOrange pl-2" 
                            : "border-[#999999] hover:text-mainOrange hover:border-mainOrange hover:pl-2"} 
                    `}>
                        Demo Update Logs
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