import { SocialIcon } from "react-social-icons"
import Logo from "../../../assets/Logo.png"
import KoFiBadge from "../../../assets/kofi_badge.webp"

export default function Footer() {

    return (
        <footer className="bg-secondaryDark text-white border-t border-mainOrange">
            <div className="max-w-[1920px] m-auto flex flex-row flex-wrap py-3">
                <div className="w-full md:w-1/2 lg:w-1/4 flex justify-center">
                    <img src={Logo} alt="logo" className="w-36 h-36" />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
                    <h1 className="text-mainOrange text-2xl font-bold pb-4">Support the website</h1>
                    <a href="https://ko-fi.com/metroidvaniagg" target="_blank" className="group">
                        <img src={"/assets/kofi_logo.webp"} alt="Ko-Fi Badge" className="w-44 transition-all group-hover:scale-110" />
                    </a>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
                    <h1 className="text-mainOrange text-2xl font-bold pb-4">Useful Links</h1>
                    <ul className="flex flex-col items-center">
                        <li><a href="https://demajen.co.uk" target="_blank" className="text-[#999999] hover:underline">Demajen's Metroidvania Maps</a></li>
                        <li><a href="https://reddit.com/r/metroidvania/" target="_blank" className="text-[#999999] hover:underline">Metroidvania Subreddit</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-center">
                    <h1 className="text-mainOrange text-2xl font-bold pb-4">Stay in Touch</h1>
                    <div className="flex gap-2">
                        <SocialIcon 
                            className="transition-all hover:scale-125" 
                            url="https://x.com/metroidvania_gg" 
                            bgColor='#dd8500' 
                            fgColor='black' 
                            target="_blank"
                        />
                        <SocialIcon 
                            className="transition-all hover:scale-125" 
                            url="https://youtube.com/@metroidvaniagg" 
                            bgColor='#dd8500' 
                            fgColor='black' 
                            target="_blank"
                        />
                        <SocialIcon 
                            className="transition-all hover:scale-125" 
                            url="https://discord.gg/f64tqHPZCh" 
                            bgColor='#dd8500' 
                            fgColor='black' 
                            target="_blank"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-mainDark text-[#999999] w-full text-center p-2">
                All Right Reserved. Designed and Developed by <a href='https://twitter.com/xoneris' target='_blank' className="text-mainOrange hover:underline">Xoneris</a>
            </div>
        </footer>
    )
} 