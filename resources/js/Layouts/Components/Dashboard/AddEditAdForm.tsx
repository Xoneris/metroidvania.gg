import { TAd } from "@/types"
import { useForm } from "@inertiajs/react"


export default function AddEditAdForm ({ad}:{ad?:TAd}) {

    console.log(ad)

    const { data, setData, post, put } = useForm<any>({
            name: ad?.name || '',
            // media: ad?.media,
            mediaFile: null,
            size: ad?.size || '',
            status: ad?.status || '',
            priority: ad?.priority || '',
            link: ad?.link || '',
        })

    const handleSubmit = (e:any) => {

        e.preventDefault()

        if (ad) {

            // console.log(data)
            post(`/Dashboard/ad-manager/${ad.id}`, data)

        } else {

            // console.log(data)
            post('/Dashboard/ad-manager', data)
        }

    }

    // console.log(data)

    return (
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>

            <div className="flex w-full gap-2">

                <div className="flex flex-col w-full">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        className={`rounded-md`}  
                        placeholder="Ad Name" 
                        value={data.name}
                        // @ts-ignore
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label>Link:</label>
                    <input 
                        type="text" 
                        className={`rounded-md`}  
                        placeholder="Ad Link" 
                        value={data.link}
                        onChange={(e) => setData('link', e.target.value)}
                    />
                </div>

            </div>

            <div className="flex w-full gap-2">

                <div className="flex flex-col w-full">
                    <label>Media:</label>
                    <input 
                        type="file" 
                        name="mediaFile" 
                        max={1} 
                        onChange={(e) => {setData('mediaFile', e.target.files?.[0])}} 
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label>Size:</label>
                    <select className="rounded-md" value={data.size} onChange={(e) => setData('size', e.target.value)}>
                        <option selected={data.size === '' ? true : false}>Select option</option>
                        <option selected={data.size === "728x90px" ? true : false}>728x90px</option>
                        <option selected={data.size === "320x100px" ? true : false}>320x100px</option>
                        <option selected={data.size === "160x600px" ? true : false}>160x600px</option>
                    </select>
                </div>
            </div>

            <div className="flex w-full gap-2">

                <div className="flex flex-col w-full">
                    <label>Status:</label>
                    <select className="rounded-md" value={data.status} onChange={(e) => setData('status', e.target.value.toLowerCase())}>
                        <option selected={data.status === '' ? true : false}>Select option</option>
                        <option selected={data.status === "active" ? true : false}>active</option>
                        <option selected={data.status === "inactive" ? true : false}>inactive</option>
                    </select>
                </div>

                <div className="flex flex-col w-full">
                    <label>Priority:</label>
                    <select className="rounded-md" value={data.priority} onChange={(e) => setData('priority', e.target.value.toLowerCase())}>
                        <option selected={data.priority === '' ? true : false}>Select option</option>
                        <option selected={data.priority === "normal" ? true : false}>normal</option>
                        <option selected={data.priority === "high" ? true : false}>high</option>
                        <option selected={data.priority === "very high" ? true : false}>very high</option>
                    </select>
                </div>

            </div>

            <img 
                src={"/storage/managed-images/"+ad?.media}
                className="w-1/4"
            />
            
            <div className="flex w-full gap-2">

                <button
                    className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                >
                    { ad ? "Edit" : "Add" }
                </button>

            </div>
            

        </form>
    )
}