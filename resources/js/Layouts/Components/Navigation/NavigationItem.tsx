import { Link } from "@inertiajs/react";


export default function NavigationItem({
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
            <div className={`
                w-[150px] text-center text-[#999999] border-4 border-transparent transition-all duration-300 hover:cursor-pointer 
                ${
                    currentUrl === destination
                    ? "border-b-mainOrange text-mainOrange" 
                    : "hover:border-b-mainOrange hover:text-mainOrange"
                }
            `}>
                {name}
            </div>
        </Link>
    )
}