import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";

export default function AddGame () {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        developer: '',
        publisher: '',
        release_date: '',
        release_window: '',
        demo: '',
        early_access: '',
        description: '',
        steam: '',
        epic: '',
        gog: '',
        playstation: '',
        xbox: '',
        switch: '',
        twitter: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        youtube: '',
        website: '',
        discord: '',
        // remember: false,
      })

    return (
        <DashboardLayout>
            
            <Head title="Add new Game" />
            
            <h1 className="text-3xl">Add Game</h1>

            <p>{data.name}</p>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Name:</label>
                        <input name="name" type="text" className="rounded-md" placeholder="Hollow Knight" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Slug:</label>
                        <input name="slug" type="text" className="rounded-md" placeholder="hollow-knight" value={data.slug} onChange={(e) => setData('slug', e.target.value)}/>
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Developer:</label>
                        <input name="developer" type="text" className="rounded-md" />
                    </div>
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Publisher:</label>
                        <input name="publisher" type="text" className="rounded-md" />
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Release Window:</label>
                        <input name="name" type="text" className="rounded-md" />
                    </div>
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Release Date:</label>
                        <input name="name" type="date" className="rounded-md" />
                    </div>
                </div>

                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Kickstarter Page:</label>
                        <input name="kickstarterpage" type="text" className="rounded-md" />
                    </div>
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Kickstarter Status:</label>
                        <select className="rounded-md">
                            <option>Funded</option>
                            <option>Upcoming</option>
                            <option>Live</option>
                        </select>
                    </div>
                </div>
                
                <div className="flex w-full">
                    <div className="flex flex-col w-1/2 p-2">
                        <label>Does the game have a Demo?</label>
                        <div className="flex items-center gap-2">
                            <label>Yes</label>
                            <input type="radio" name="demo" />
                            <label>No</label>
                            <input type="radio" name="demo" />
                        </div>
                    </div>

                    <div className="flex flex-col w-1/2 p-2">
                        <label>Is the game in Early Access?</label>
                        <div className="flex items-center gap-2">
                            <label>Yes</label>
                            <input type="radio" name="earlyaccess" />
                            <label>No</label>
                            <input type="radio" name="earlyaccess" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-2">
                    <label>Description:</label>
                    <input name="name" type="text" className="rounded-md h-[100px]" />
                </div>


                <div className="flex w-full">

                    <div className="w-1/2 flex flex-col gap-1 p-2">
                        <h2 className="text-2xl">Platforms:</h2>
                        <hr className="bg-black w-full h-1"/>
                        <label>Steam:</label>
                        <input name="steam" type="text" className="rounded-md" />
                        <label>Epic Games:</label>
                        <input name="epic" type="text" className="rounded-md" />
                        <label>GoG:</label>
                        <input name="gog" type="text" className="rounded-md" />
                        <label>Playstation:</label>
                        <input name="playstation" type="text" className="rounded-md" />
                        <label>Xbox:</label>
                        <input name="xbox" type="text" className="rounded-md" />
                        <label>Nintendo Switch:</label>
                        <input name="nintendo" type="text" className="rounded-md" />
                    </div>

                    <div className="w-1/2 flex flex-col gap-1 p-2">
                        <h2 className="text-2xl">Social Media:</h2>
                        <hr className="bg-black w-full h-1"/>
                        <label>Twitter:</label>
                        <input name="twitter" type="text" className="rounded-md" />
                        <label>Instagram:</label>
                        <input name="instagram" type="text" className="rounded-md" />
                        <label>Facebook:</label>
                        <input name="facebook" type="text" className="rounded-md" />
                        <label>TikTok:</label>
                        <input name="tiktok" type="text" className="rounded-md" />
                        <label>YouTube:</label>
                        <input name="youtube" type="text" className="rounded-md" />
                        <label>Discord:</label>
                        <input name="discord" type="text" className="rounded-md" />
                        <label>Website:</label>
                        <input name="website" type="text" className="rounded-md" />
                    </div>

                </div>

                <button className="w-28 rounded-md bg-white text-black">Add Game</button>
            </div>

        </DashboardLayout>
    )
}