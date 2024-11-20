import { Link } from "@inertiajs/react"
import Logo from "../../../assets/Logo.png"

export default function Header () {

    return (
        <header className="bg-mainDark border-b border-mainOrange text-white">
            <div className="max-w-[1920px] flex justify-between items-end m-auto">
                <div className="flex p-2">
                    <img src={Logo} alt="logo" className="w-12 h-12" />
                    <span className="text-mainOrange text-4xl font-extrabold">MetroidVania.GG</span>
                </div>
                <nav className="flex">
                    <Link href="/">
                        <div className="w-[150px] text-center text-[#999999] border-4 border-transparent transition-all hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange">Home</div>
                    </Link>
                    <div className="group w-[150px] text-center text-[#999999] border-4 border-transparent transition-all hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange">
                        In Development
                        <div className="absolute bg-mainDark top-18 mt-[5px] hidden flex-col gap-1 group-hover:flex">
                            <p className="text-[#999999] transition-all hover:bg-mainOrange hover:text-black">2024</p>
                            <p className="text-[#999999] transition-all hover:bg-mainOrange hover:text-black">2025</p>
                            <p className="text-[#999999] transition-all hover:bg-mainOrange hover:text-black">TBD</p>
                            <p className="text-[#999999] transition-all hover:bg-mainOrange hover:text-black">Early Access</p>
                            <p className="text-[#999999] transition-all hover:bg-mainOrange hover:text-black">Upcoming Kickstarter</p>
                        </div>
                    </div>
                    <Link href="/demos">
                        <div className="w-[150px] text-center text-[#999999] border-4 border-transparent transition-all hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange">Demos</div>
                    </Link>
                    <div className="w-[150px] text-center text-[#999999] border-4 border-transparent transition-all hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange">Released</div>
                    <div className="w-[150px] text-center text-[#999999] border-4 border-transparent transition-all hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange">Platforms</div>
                    <div className="w-[150px] text-center text-[#999999] border-4 border-transparent transition-all hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange">All Games</div>
                </nav>
            </div>
        </header>
    )
}