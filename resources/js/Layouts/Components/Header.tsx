import { Link, usePage } from "@inertiajs/react"
import Logo from "../../../assets/Logo.png"

export default function Header () {

    const { url } = usePage()

    return (
        <header className="bg-mainDark border-b border-mainOrange text-white">

            <div className="max-w-[1920px] flex justify-between items-end m-auto">

                <div className="flex p-2">
                    <img src={Logo} alt="logo" className="w-12 h-12" />
                    <span className="text-mainOrange text-4xl font-extrabold">MetroidVania.GG</span>
                </div>

                <nav className="flex">

                    <Link href="/">
                        <div className={`
                            w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer 
                            ${
                                url === "/" 
                                ? "border-b-mainOrange text-mainOrange" 
                                : "hover:border-b-mainOrange hover:text-mainOrange"
                            }
                        `}>
                            Home
                        </div>
                    </Link>

                    <div className={`
                        group relative w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange 
                        ${
                            url === "/2024" || url === "/2025" || url === "/TBD" || url === "/EarlyAccess" || url === "/UpcomingKickstarter"
                            ? "border-b-mainOrange text-mainOrange" 
                            : "group-hover:border-b-mainOrange group-hover:text-mainOrange"
                        }
                    `}>
                        In Development
                        {/* <div className="absolute bg-mainDark w-[150px] mt-1 -ml-[4px] hidden flex-col gap-1 z-20 border border-mainOrange transition-all duration-500 group-hover:flex"> */}
                        <div className="absolute bg-mainDark w-[150px] max-h-0 overflow-hidden mt-1 -ml-[4px] flex flex-col gap-1 z-20 border-0 border-transparent rounded-b-lg group-hover:border-mainOrange transition-all duration-700 group-hover:flex group-hover:max-h-screen group-hover:overflow-ellipsis group-hover:border">

                            <Link href="/2024">
                                <p className={`
                                    text-[#999999] transition-all p-1 
                                    ${
                                        url === "/2024"
                                        ? "bg-mainOrange text-black"
                                        : "hover:bg-mainOrange hover:text-black"
                                    }     
                                `}>
                                    2024
                                </p>
                            </Link>

                            <Link href="/2025">
                                <p className={`
                                    text-[#999999] transition-all p-1 
                                    ${
                                        url === "/2025"
                                        ? "bg-mainOrange text-black"
                                        : "hover:bg-mainOrange hover:text-black"
                                    }
                                `}>
                                    2025
                                </p>    
                            </Link>

                            <Link href="/TBD">
                                <p className={`
                                    text-[#999999] transition-all p-1 
                                    ${
                                        url === "/TBD"
                                        ? "bg-mainOrange text-black"
                                        : "hover:bg-mainOrange hover:text-black"
                                    }
                                `}>
                                    TBD
                                </p>    
                            </Link>

                            <Link href="/EarlyAccess">
                                <p className={`
                                    text-[#999999] transition-all p-1 
                                    ${
                                        url === "/EarlyAccess"
                                        ? "bg-mainOrange text-black"
                                        : "hover:bg-mainOrange hover:text-black"
                                    }
                                    `}>
                                    Early Access
                                </p>    
                            </Link>

                            <Link href="/UpcomingKickstarter">
                                <p className={`
                                    text-[#999999] transition-all p-1 
                                    ${
                                        url === "/UpcomingKickstarter"
                                        ? "bg-mainOrange text-black"
                                        : "hover:bg-mainOrange hover:text-black"
                                    }
                                    `}>
                                    Upcoming Kickstarter
                                </p>    
                            </Link>

                        </div>
                    </div>

                    <Link href="/Demos">
                        <div className={`
                            w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer 
                            ${
                                url === "/Demos" 
                                ? "border-b-mainOrange text-mainOrange" 
                                : "hover:border-b-mainOrange hover:text-mainOrange"
                            }
                        `}>
                            Demos
                        </div>
                    </Link>

                    <div className={`
                        w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer 
                        ${
                            url === "/a" 
                            ? "border-b-mainOrange" 
                            : "hover:text-mainOrange hover:border-b-mainOrange"
                        }
                    `}>
                        Released
                    </div>

                    <div className={`
                        w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer 
                        ${
                            url === "/b" 
                            ? "border-b-mainOrange" 
                            : "hover:text-mainOrange hover:border-b-mainOrange"
                        }
                    `}>
                        Platforms
                    </div>

                    <div className={`
                        w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer 
                        ${
                            url === "/c" 
                            ? "border-b-mainOrange" 
                            : "hover:text-mainOrange hover:border-b-mainOrange"
                        }
                    `}>
                        All Games
                    </div>

                </nav>
            </div>
        </header>
    )
}