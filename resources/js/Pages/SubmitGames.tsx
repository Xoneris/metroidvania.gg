import Layout from "@/Layouts/Layout";
import { GameData } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function () {

       const { data, setData, post, put, processing, errors, setError } = useForm<GameData|any>({
            name: '',
            slug: '',
            developer: '',
            publisher: '',
            release_date: '',
            release_window: '',
            demo: 0,
            early_access: 0,
            kickstarter_page: '',
            kickstarter_status: '',
            description: '',
            trailer: '',
            thumbnail: '',
            steam: '',
            epic: '',
            gog: '',
            playstation: '',
            xbox: '',
            nintendo: '',
            twitter: '',
            facebook: '',
            instagram: '',
            tiktok: '',
            youtube: '',
            website: '',
            discord: '',
        })

    return(
        <Layout>
            <Head title="Submit a game"/>

            <section className="max-w-[1920px] m-auto flex flex-col p-4 gap-2">

                <h1 className="text-2xl">Submit a Game!</h1>
                <hr className="bg-black w-full h-[2px]"/>

                <div className="flex flex-col items-center">

                    <div className="flex pl-1 gap-1 w-full border-b border-black">
                        <div className="p-2 -mb-[1px] border border-black border-b-[#EEEEEE] rounded-t-md z-10">Basic Information</div>
                        <div className="p-2 -mb-[1px] border border-black rounded-t-md">Demo, Early Access & Kickstarter</div>
                        <div className="p-2 -mb-[1px] border border-black rounded-t-md">Platforms</div>
                        <div className="p-2 -mb-[1px] border border-black rounded-t-md">Social Media</div>
                    </div>

                    <div>
                        content
                    </div>

                    <div className="flex w-full justify-between">
                        <button>Previous</button>
                        <button>Next</button>
                    </div>
                </div>

            </section>
        </Layout>
    )
}