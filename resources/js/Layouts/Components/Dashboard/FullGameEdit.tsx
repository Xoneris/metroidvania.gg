import { GameData } from "@/types";
import { useForm } from "@inertiajs/react";

export default function FullGameEdit({game, editGame}:{editGame: boolean, game: GameData|undefined,}) {

    const { data, setData, post, processing, errors, setError } = useForm<any>(game || {
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
        
    function handleSubmit(e:any) {

        e.preventDefault()

        if (editGame === true) {

            // post('/Game/Edit', data)
            console.log(data)

        } else if (editGame === false) {

            post('/Game/New', data)
            console.log(data)
        }
    }

    // function fetchFile(e:any) {
    //     const reader = new FileReader
    //     if (e.target.files instanceof FileList) {
    //         return reader.readAsDataURL(e.target.files[0])
    //     }
    // }

    return (

        <form className="flex flex-col gap-1 w-full" onSubmit={handleSubmit}>

            <div className="flex w-full">
                <div className="flex flex-col w-1/2 p-2">

                    <label htmlFor="name">Name: *</label>
                    <input 
                        name="name" 
                        type="text" 
                        className={`rounded-md ${errors.name ? "border border-red-600" : null}`}  
                        placeholder="Hollow Knight" 
                        value={data.name} 
                        onChange={(e) => setData('name', e.target.value)}
                        onBlur={(e) => e.target.value === "" ? setError('name', 'please fill this out') : setError('name','')}
                    />
                    <p className="text-red-600">{errors.name}</p>

                </div>
                <div className="flex flex-col w-1/2 p-2">
                    <label>Slug: *</label>
                    <input 
                        name="slug" 
                        type="text" 
                        className="rounded-md" 
                        placeholder="hollow-knight" 
                        value={data.slug} 
                        onChange={(e) => setData('slug', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex w-full">
                <div className="flex flex-col w-1/2 p-2">
                    <label>Developer: *</label>
                    <input name="developer" type="text" className="rounded-md" placeholder="Team Cherry" value={data.developer} onChange={(e) => setData('developer', e.target.value)} />
                </div>
                <div className="flex flex-col w-1/2 p-2">
                    <label>Publisher:</label>
                    <input name="publisher" type="text" className="rounded-md" placeholder="Team Cherry" value={data.publisher} onChange={(e) => setData('publisher', e.target.value)} />
                </div>
            </div>

            <div className="flex w-full">
                <div className="flex flex-col w-1/2 p-2">
                    <label>Release Window: *</label>
                    <input name="name" type="text" className="rounded-md" placeholder="Q2 2025" value={data.release_window} onChange={(e) => setData('release_window', e.target.value)} />
                </div>
                <div className="flex flex-col w-1/2 p-2">
                    <label>Release Date: *</label>
                    <input name="name" type="date" className="rounded-md" value={data.release_date} onChange={(e) => setData('release_date', e.target.value)} />
                </div>
            </div>

            <div className="flex w-full">
                <div className="flex flex-col w-1/2 p-2">
                    <label>Kickstarter Page:</label>
                    <input name="kickstarterpage" type="text" className="rounded-md" 
                        placeholder="" value={data.kickstarter_page} onChange={(e) => setData('kickstarter_page', e.target.value)} 
                        />
                </div>
                <div className="flex flex-col w-1/2 p-2">
                    <label>Kickstarter Status:</label>
                    <select className="rounded-md" value={data.kickstarter_status} onChange={(e) => setData('kickstarter_status', e.target.value)}>
                        <option selected={data.kickstarter_status === '' ? true : false}>Select option</option>
                        <option selected={data.kickstarter_status === "Funded" ? true : false}>Funded</option>
                        <option selected={data.kickstarter_status === "Upcoming" ? true : false}>Upcoming</option>
                        <option selected={data.kickstarter_status === "Live" ? true : false}>Live</option>
                    </select>
                </div>
            </div>
            
            <div className="flex w-full">
                <div className="flex flex-col w-1/2 p-2">
                    <label>Does the game have a Demo? *</label>
                    <div className="flex items-center gap-2">
                        <label>Yes</label>
                        <input type="radio" name="demo" value={data.demo} checked={data.demo === 1 ? true : false} onClick={() => setData('demo', 1)} />
                        <label>No</label>
                        <input type="radio" name="demo" value={data.demo} checked={data.demo === 0 ? true : false} onClick={() => setData('demo', 0)}/>
                    </div>
                </div>

                <div className="flex flex-col w-1/2 p-2">
                    <label>Is the game in Early Access? *</label>
                    <div className="flex items-center gap-2">
                        <label>Yes</label>
                        <input type="radio" name="earlyaccess" value={data.early_access} checked={data.early_access === 1 ? true : false} onClick={() => setData('early_access', 1)} />
                        <label>No</label>
                        <input type="radio" name="earlyaccess" value={data.early_access} checked={data.early_access === 0 ? true : false} onClick={() => setData('early_access', 0)} />
                    </div>
                </div>
            </div>

            <div className="flex w-full">

                <div className="flex flex-col w-1/2 p-2">
                    <label>Thumbnail:</label>
                    <input type="file" name="thumbnail" accept="image/png, image/jpg" max={1} onChange={(e) => setData('thumbnail', e.target.files?.[0])} />
                    {
                        editGame 
                        ? <img className="w-1/3 my-2 rounded-lg" src={"/assets/thumbnails/"+data.slug+".jpg"} />
                        : null
                    }
                </div>

                <div className="flex flex-col w-1/2 p-2">
                    <label>Trailer:</label>
                    <input type="text" name="trailer" className="rounded-md" value={data.trailer} onChange={(e) => setData('trailer', e.target.value)} />
                </div>

            </div>

            <div className="flex flex-col p-2">
                <label>Description: *</label>
                <input name="name" type="text" className="rounded-md h-[100px]" placeholder="Cool description here" value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </div>

            <div className="flex w-full">

                <div className="w-1/2 flex flex-col gap-1 p-2">
                    <h2 className="text-2xl">Platforms:</h2>
                    <hr className="bg-black w-full h-1"/>
                    <label>Steam:</label>
                    <input name="steam" type="text" className="rounded-md" value={data.steam} onChange={(e) => setData('steam', e.target.value)} />
                    <label>Epic Games:</label>
                    <input name="epic" type="text" className="rounded-md" value={data.epic} onChange={(e) => setData('epic', e.target.value)} />
                    <label>GoG:</label>
                    <input name="gog" type="text" className="rounded-md" value={data.gog} onChange={(e) => setData('gog', e.target.value)} />
                    <label>Playstation:</label>
                    <input name="playstation" type="text" className="rounded-md" value={data.playstation} onChange={(e) => setData('playstation', e.target.value)} />
                    <label>Xbox:</label>
                    <input name="xbox" type="text" className="rounded-md" value={data.xbox} onChange={(e) => setData('xbox', e.target.value)} />
                    <label>Nintendo Switch:</label>
                    <input name="nintendo" type="text" className="rounded-md" value={data.switch} onChange={(e) => setData('switch', e.target.value)} />
                </div>

                <div className="w-1/2 flex flex-col gap-1 p-2">
                    <h2 className="text-2xl">Social Media:</h2>
                    <hr className="bg-black w-full h-1"/>
                    <label>Twitter:</label>
                    <input name="twitter" type="text" className="rounded-md" value={data.twitter} onChange={(e) => setData('twitter', e.target.value)} />
                    <label>Instagram:</label>
                    <input name="instagram" type="text" className="rounded-md" value={data.instagram} onChange={(e) => setData('instagram', e.target.value)} />
                    <label>Facebook:</label>
                    <input name="facebook" type="text" className="rounded-md" value={data.facebook} onChange={(e) => setData('facebook', e.target.value)} />
                    <label>TikTok:</label>
                    <input name="tiktok" type="text" className="rounded-md" value={data.tiktok} onChange={(e) => setData('tiktok', e.target.value)} />
                    <label>YouTube:</label>
                    <input name="youtube" type="text" className="rounded-md" value={data.youtube} onChange={(e) => setData('youtube', e.target.value)} />
                    <label>Discord:</label>
                    <input name="discord" type="text" className="rounded-md" value={data.discord} onChange={(e) => setData('discord', e.target.value)} />
                    <label>Website:</label>
                    <input name="website" type="text" className="rounded-md" value={data.website} onChange={(e) => setData('website', e.target.value)} />
                </div>

            </div>

            <button className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange">
                {
                    editGame ? "Save Game" : "Add Game"
                }
            </button>

        </form>
    )
}