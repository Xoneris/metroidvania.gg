import { Link } from "@inertiajs/react"
import Logo from "../../../assets/Logo.png"
import Navigation from "./Navigation"

export default function Header () {

    const date = new Date()

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentDay = days[date.getDay()]
    const currentMonth = months[date.getMonth()]
    const currentHour = date.getHours()
    const currentMinute = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()

    return (
        <header className="bg-mainDark border-b border-mainOrange text-white">

            <div className="max-w-[1920px] flex justify-between bg-[#111111] p-2 text-sm text-[#999999]">
                <p className="flex gap-1">
                    <span>{currentDay}</span>-
                    <span>{currentMonth}</span>
                    <span>{date.getDate()}</span>-
                    <span>{currentHour + ":" + currentMinute}</span>
                </p>
                <div className="flex gap-1">
                    <p><a href="https://twitter.com/metroidvania_gg" target="_blank" className="hover:underline hover:cursor-pointer">Twitter</a> | </p>
                    <p><a href="https://youtube.com/@metroidvaniagg" target="_blank" className="hover:underline hover:cursor-pointer">YouTube</a> | </p>
                    <p><a href="https://discord.gg/f64tqHPZCh" target="_blank" className="hover:underline hover:cursor-pointer">Discord</a> | </p>
                    <Link href="/SubmitGame">
                        <p className="hover:underline hover:cursor-pointer">
                            Submit a Game
                        </p>
                    </Link>
                </div>
            </div>

            <div className="max-w-[1920px] flex justify-between items-center lg:items-end m-auto">

                <Link href="/">
                    <div className="flex p-2">
                        <img src={Logo} alt="logo" className="w-12 h-12" />
                        <span className="text-mainOrange text-4xl font-extrabold hidden xl:block">MetroidVania.GG</span>
                        <span className="text-mainOrange text-4xl font-extrabold block xl:hidden ">MV.GG</span>
                    </div>
                </Link>

                <Navigation />

            </div>
        </header>
    )
}