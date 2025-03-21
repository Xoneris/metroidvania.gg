import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import MobileNavLink from "./MobileNavLink"

export default function MobileNav() {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { url } = usePage()

    return (
        <>
            <div
                className="lg:hidden flex flex-col justify-center m-2 gap-2 w-10 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="w-full h-1 bg-mainOrange"></p>
                <p className="w-full h-1 bg-mainOrange"></p>
                <p className="w-full h-1 bg-mainOrange"></p>
            </div>


            <div className={`${isOpen ? "w-[300px] border-l border-mainOrange" : "w-0"} fixed top-0 right-0 h-screen z-50 overflow-hidden bg-mainDark bg-opacity-70 backdrop-blur-lg transition-all`}>

                <div className="flex justify-end items-center m-2">

                    <div
                        className="relative m-2 w-10 h-10 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                        >
                        <p className="absolute top-2 m-2 w-10 h-1 bg-mainOrange rotate-45"></p>
                        <p className="absolute top-2 m-2 w-10 h-1 bg-mainOrange -rotate-45"></p>
                    </div>

                </div>
                {/* <div className="flex flex-col items-center">
                    <Link href={"/"}>Home</Link>
                    </div> */}

                <div className="flex flex-col items-start gap-2 p-4">

                    

                    <MobileNavLink 
                        currentUrl={url}
                        destination={"/"}
                        name={"Home"}
                    />

                    <p className="w-full">In Development</p>

                    <div className="flex flex-col gap-2 w-full pl-4 border-l">

                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/2025"}
                            name={"2025"}
                        />

                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/2026"}
                            name={"2026"}
                            />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/TBD"}
                            name={"TBD"}
                            />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/EarlyAccess"}
                            name={"Early Access"}
                            />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/UpcomingKickstarters"}
                            name={"Upcoming Kickstarters"}
                        />
                    </div>

                    <MobileNavLink 
                        currentUrl={url}
                        destination={"/Demos"}
                        name={"Demos"}
                    />

                    <MobileNavLink 
                        currentUrl={url}
                        destination={"/Released"}
                        name={"Released"}
                    />
                    <p className="w-full">Platforms</p>

                    <div className="flex flex-col gap-2 w-full pl-4 border-l">
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/Steam"}
                            name={"Steam"}
                        />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/Epic"}
                            name={"Epic"}
                        />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/GoG"}
                            name={"GoG"}
                        />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/Playstation"}
                            name={"Playstation"}
                        />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/Xbox"}
                            name={"Xbox"}
                        />
                        <MobileNavLink 
                            currentUrl={url}
                            destination={"/Nintendo"}
                            name={"Nintendo"}
                        />
                    </div>
                    <MobileNavLink 
                        currentUrl={url}
                        destination={"/AllGames"}
                        name={"All Games"}
                    />

                </div>
            </div>
        </>
    )
}