import { Link } from "@inertiajs/react";

export default function NavigationDropdownItem({
    currentUrl,
    destination,
    name,
}:{
    currentUrl: string,
    destination: string,
    name: string
}) {

    return (
        <Link href={destination}>
            <p className={`
                text-[#999999] transition-all p-1 
                ${
                    currentUrl === destination
                    ? "bg-mainOrange text-black"
                    : "hover:bg-mainOrange hover:text-black"
                }     
            `}>
                {name}
            </p>
        </Link>
    )
}