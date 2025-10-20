import type { TAd } from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import AddEditAdForm from "@/Layouts/Components/Dashboard/AddEditAdForm";
import { useState } from "react";
import { useForm } from "@inertiajs/react";


export default function AdManager ({ads}:{ads:TAd[]}) {

    const [addEditAd, setAddEditAd] = useState<boolean>(false)
    const [adToEdit, setAdToEdit] = useState<TAd>()
    const [adActiveStatus, setAdActiveStatus] = useState<string>("active")

    const { delete:destory } = useForm<any>({})

    const handleDelete = (id:number) => {

        destory(`/Dashboard/ad-manager/${id}`)

    }

    console.log(ads)

    return (
        <DashboardLayout>
            
            <h1 className="text-3xl">Ad Manager</h1>

            {
                addEditAd 
                ? <>
                    <button
                        className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                        onClick={() => setAddEditAd(false)}
                    >
                        Back
                    </button>
                    <AddEditAdForm
                        ad={adToEdit}
                    />
                </>
                : <div className="flex flex-col gap-2">
                    <button
                        className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                        onClick={() => {
                            setAdToEdit(undefined)
                            setAddEditAd(true)
                        }}
                    >
                        New Ad
                    </button>

                    <div className="flex pl-1 gap-1 w-full border-b border-black">
                   
                        <div 
                            className={`${adActiveStatus === "active" ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`} 
                            onClick={() => setAdActiveStatus("active")}
                        >
                            Active Ads
                        </div>
                        <div 
                            className={`${adActiveStatus === "inactive" ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`} 
                            onClick={() => setAdActiveStatus("inactive")}
                        >
                            Inactive Ads
                        </div>
                    </div>

                    <table className="w-full">
                        <thead className="bg-black text-mainOrange font-bold">
                            <tr className="[&>td]:p-2">
                                <td>Name</td>
                                <td>Size</td>
                                <td>Status</td>
                                <td>Priority</td>
                                <td>Link</td>
                                <td>Clicked</td>
                                <td>Action</td>
                            </tr>
                        </thead>

                    {
                        ads?.filter((ad) => ad.status === adActiveStatus).map((ad) => (
                            <tbody className="odd:bg-[#CCCCCC]" key={ad.id}>
                                <tr className="[&>td]:p-2">
                                    <td>{ad.name}</td>
                                    <td>{ad.size}</td>
                                    <td>{ad.status}</td>
                                    <td>{ad.priority}</td>
                                    <td>{ad.link}</td>
                                    <td>{ad.clickedAmount}</td>
                                    <td>
                                        <button
                                            className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                            onClick={() => {
                                                setAdToEdit(ad)
                                                setAddEditAd(true)
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                            onClick={() => handleDelete(ad.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                    </table>
                </div>
            }

            

        </DashboardLayout>
    )
}