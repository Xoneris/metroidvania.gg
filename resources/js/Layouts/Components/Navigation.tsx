import { usePage } from "@inertiajs/react";
import NavigationDropdownMenu from "./Navigation/NavigationDropdownMenu";
import NavigationItem from "./Navigation/NavigationItem";


export default function Navigation() {

    const { url } = usePage()

    return (
        <nav className="flex">

            <NavigationItem 
                currentUrl={url}
                destination={"/"}
                name={"Home"}
            />

            <NavigationDropdownMenu 
                currentUrl={url}
                dropdownItems={
                    [
                        {destination: "/2024", name: "2024"},
                        {destination: "/2025", name: "2025"},
                        {destination: "/TBD", name: "TBD"},
                        {destination: "/EarlyAccess", name: "Early Access"},
                        {destination: "/UpcomingKickstarters", name: "Upcoming Kickstarters"},
                    ]
                }
                name={"In Development"}
            />

            <NavigationItem 
                currentUrl={url}
                destination={"/Demos"}
                name={"Demos"}
            />

            <NavigationItem 
                currentUrl={url}
                destination={"/Released"}
                name={"Released"}
            />

            <NavigationDropdownMenu 
                currentUrl={url}
                dropdownItems={
                    [
                        {destination: "/Steam", name: "Steam"},
                        {destination: "/Epic", name: "Epic Games"},
                        {destination: "/GoG", name: "GoG"},
                        {destination: "/Playstation", name: "Playstation"},
                        {destination: "/Xbox", name: "Xbox"},
                        {destination: "/Nintendo", name: "Nintendo Switch"},
                    ]
                }
                name={"Platforms"}
            />

            {/* <div className={`
                group relative w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer hover:text-mainOrange hover:border-b-mainOrange 
                ${
                    url === "/Steam" || url === "/Epic" || url === "/GoG" || url === "/Playstation" || url === "/Xbox" || url === "/Nintendo"
                    ? "border-b-mainOrange text-mainOrange" 
                    : "group-hover:border-b-mainOrange group-hover:text-mainOrange"
                }
            `}>
                Platforms
                <div className="absolute bg-mainDark w-[150px] max-h-0 overflow-hidden mt-1 -ml-[4px] flex flex-col gap-1 z-20 border-0 border-transparent rounded-b-lg group-hover:border-mainOrange transition-all duration-700 group-hover:flex group-hover:max-h-screen group-hover:overflow-ellipsis group-hover:border">
                    
                    <NavigationDropdownItem
                        currentUrl={url}
                        destination={"/Steam"}
                        name={"Steam"}
                    />
                    <NavigationDropdownItem
                        currentUrl={url}
                        destination={"/Epic"}
                        name={"Epic Games"}
                    />
                    <NavigationDropdownItem
                        currentUrl={url}
                        destination={"/GoG"}
                        name={"GoG"}
                    />
                    <NavigationDropdownItem
                        currentUrl={url}
                        destination={"/Playstation"}
                        name={"Playstation"}
                    />
                    <NavigationDropdownItem
                        currentUrl={url}
                        destination={"/Xbox"}
                        name={"Xbox"}
                    />
                    <NavigationDropdownItem
                        currentUrl={url}
                        destination={"/Nintendo"}
                        name={"Nintendo Switch"}
                    />
                </div>
            </div> */}

            <NavigationItem 
                currentUrl={url}
                destination={"/AllGames"}
                name={"All Games"}
            />

        </nav>
    )
}