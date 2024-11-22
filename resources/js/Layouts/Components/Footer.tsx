import Logo from "../../../assets/Logo.png"

export default function Footer() {

    return (
        <footer className="bg-secondaryDark text-white border-t border-mainOrange">
            <div className="max-w-[1920px] m-auto flex flex-row flex-wrap py-3">
                <div className="w-full md:w-1/2 lg:w-1/4 flex justify-center">
                    {/* <Image src="../../assets/Logo.png" alt="Logo" width={100} heigth={100} />  */}
                    <img src={Logo} alt="logo" className="w-36 h-36" />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 flex justify-center">
                    <h1 className="text-mainOrange text-2xl font-bold">Metroidvania Content Creators</h1>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
                    <h1 className="text-mainOrange text-2xl font-bold pb-4">Useful Links</h1>
                    <ul className="flex flex-col items-center">
                        <li><a href="https://demajen.co.uk" target="_blank" className="text-[#999999] hover:underline">Demajen's Metroidvania Maps</a></li>
                        <li><a href="https://reddit.com/r/metroidvania/" target="_blank" className="text-[#999999] hover:underline">Metroidvania Subreddit</a></li>
                        {/* <li><Link to="/changelog">Changelog</Link></li> */}
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 flex justify-center">
                    <h1 className="text-mainOrange text-2xl font-bold">Stay in Touch</h1>
                </div>
            </div>

            <div className="bg-mainDark text-[#999999] w-full flex justify-center">
                @2024 - Metroidvania.GG. All Right Reserved. Designed and Developed by<a href='https://twitter.com/xoneris' target='_blank' className="text-mainOrange hover:underline">Xoneris</a>
            </div>
        </footer>
    )
} 