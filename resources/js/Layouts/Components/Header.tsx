import { Link } from "@inertiajs/react"
import Logo from "../../../assets/Logo.png"
import Navigation from "./Navigation"

export default function Header () {

    return (
        <header className="bg-mainDark border-b border-mainOrange text-white">

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