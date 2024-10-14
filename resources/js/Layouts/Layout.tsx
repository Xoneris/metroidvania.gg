import { PropsWithChildren } from "react";


export default function Layout({children}: PropsWithChildren) {

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-mainDark border-b border-mainOrange">
                Navigation
            </header>

            <main className="grow bg-[#eeeeee]">
                {children}
            </main>

            <footer className="bg-mainDark">
                Footer
            </footer>
        </div>
    )
}