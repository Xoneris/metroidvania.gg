import { Link } from "@inertiajs/react";

export default function MobileNavLink({
    currentUrl,
    destination,
    name,
}:{
    currentUrl: string,
    destination: string,
    name: string
}) {

    return (
        <div className={`flex flex-col w-full items-start ${destination === currentUrl ? "text-mainOrange font-bold border-mainOrange" : ""}`}>
            <Link href={destination}>
                {name}
            </Link>
        </div>
    )
}