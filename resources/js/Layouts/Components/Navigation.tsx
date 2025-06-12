import { usePage } from "@inertiajs/react";
import NavigationDropdownMenu from "./Navigation/NavigationDropdownMenu";
import NavigationItem from "./Navigation/NavigationItem";
import MobileNav from "./Navigation/MobileNav";


export default function Navigation() {

    const { url } = usePage()

    return (
        <>
            <nav className="hidden lg:flex">

                <NavigationItem 
                    currentUrl={url}
                    destination={"/"}
                    name={"Home"}
                />

                <NavigationDropdownMenu 
                    currentUrl={url}
                    dropdownItems={[
                        {destination: "/coming-soon", name: "Coming Soon"},
                        {destination: "/2025", name: "2025"},
                        {destination: "/2026", name: "2026"},
                        {destination: "/TBD", name: "TBD"},
                        {destination: "/EarlyAccess", name: "Early Access"},
                        {destination: "/UpcomingKickstarters", name: "Upcoming Kickstarters"},
                    ]}
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
                    dropdownItems={[
                        {destination: "/Steam", name: "Steam"},
                        {destination: "/Epic", name: "Epic Games"},
                        {destination: "/GoG", name: "GoG"},
                        {destination: "/Playstation", name: "Playstation"},
                        {destination: "/Xbox", name: "Xbox"},
                        {destination: "/Nintendo", name: "Nintendo Switch"},
                    ]}
                    name={"Platforms"}
                />

                <NavigationItem 
                    currentUrl={url}
                    destination={"/AllGames"}
                    name={"All Games"}
                />

                <NavigationDropdownMenu 
                    currentUrl={url}
                    dropdownItems={[
                        {destination: "/steam-sale", name: "Steam"},
                        {destination: "/gog-sale", name: "GoG"},
                    ]}
                    name={"On Sale"}
                />

            </nav>

            <MobileNav/>
        </>
    )
}