import DashboardLayout from "@/Layouts/DashboardLayout";
import { Report } from "@/types";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Reports ({reports}:{reports:Report[]}) {

    const [$reports, setReports] = useState<Report[]>(reports)
    const [reportStatus, setReportStatus] = useState<"open"|"closed"|"ignored">("open")
    const {data, setData, put} = useForm<any>({
        status: ""
    })

    function handleChange(id:number) {

        if(data.status !== "") {

            put(`/Report/${id}`, data)

            setReports(prevReports => 
                prevReports.map(report => 
                    report.id === id 
                    ? {...report, status: data.status} 
                    : report 
                )
            )
        }
    } 

    return (
        <DashboardLayout>

            <h2 className="text-3xl">Reports</h2>
            
            <div className="flex pl-1 gap-1 w-full border-b border-black">
                   
                <div 
                    className={`${reportStatus === "open" ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`} 
                    onClick={() => {setReportStatus("open")}}
                >
                    Open Reports
                </div>
                <div 
                    className={`${reportStatus === "closed" ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`} 
                    onClick={() => {setReportStatus("closed")}}
                >
                    Fixed Reports
                </div>
                <div 
                    className={`${reportStatus === "ignored" ? "border-b-[#EEEEEE]" : "bg-white hover:cursor-pointer" } p-2 -mb-[1px] border border-black rounded-t-md z-10`} 
                    onClick={() => {setReportStatus("ignored")}}
                >
                    Ignored Reports
                </div>
            </div>

            <table className="w-full">
                <thead className="bg-black text-mainOrange font-bold">
                    <tr className="[&>td]:p-2">
                        <td>Game</td>
                        <td>Report</td>
                        <td>Action</td>
                        <td>Confirm</td>
                    </tr>
                </thead>
                {
                    $reports?.filter((report) => report.status === reportStatus).map((report) => (
                        <tbody className="odd:bg-[#CCCCCC]" key={report.id}>
                            <tr className="[&>td]:p-2">
                                <td>{report.game_name}</td>
                                <td>{report.report}</td>
                                <td>       
                                    <select
                                        className="rounded-lg"
                                        // @ts-ignore , I don't understand why I'm getting this error...
                                        onChange={(e) => setData("status", e.target.value)}
                                    >
                                        <option value="open" selected={report.status === "open" ? true : false}>Open</option>
                                        <option value="fixed" selected={report.status === "fixed" ? true : false}>Fixed</option>
                                        <option value="ignored" selected={report.status === "ignored" ? true : false}>Ignored</option>
                                    </select>
                                </td>
                                <td>
                                    <button 
                                        className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                        onClick={() => handleChange(report.id)}    
                                    >
                                        Confirm
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>

        </DashboardLayout>
    )
}