import DashboardLayout from "@/Layouts/DashboardLayout";
import { Report } from "@/types";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Reports ({reports}:{reports:Report[]}) {

    const [reportStatus, setReportStatus] = useState<string>("open")
    const {data, setData, put} = useForm<any>({
        status: ""
    })

    function handleChange(id:number) {
        if(data.status !== "") {
            put(`/Report/${id}`, data)
        }
    }

    return (
        <DashboardLayout>

            <h2 className="text-3xl">Reports</h2>
            
            <div className="flex gap-2">
                <div 
                    className={`${reportStatus === "open" ? "text-mainOrange" : "text-black cursor-pointer"} bg-white border border-[#666666] rounded-lg p-2`} 
                    onClick={() => {
                        setData("status", "")
                        setReportStatus("open")
                    }}
                >
                    Open Reports
                </div>
                <div 
                    className={`${reportStatus === "closed" ? "text-mainOrange" : "text-black cursor-pointer"} bg-white border border-[#666666] rounded-lg p-2`} 
                    onClick={() => {
                        setData("status", "")
                        setReportStatus("closed")
                    }}
                >
                    Closed Reports
                </div>
            </div>

            <table className="w-full">
                <thead className="bg-black text-mainOrange font-bold">
                    <tr className="[&>td]:p-2">
                        <td>Game</td>
                        <td>Report</td>
                        <td>Status</td>
                    </tr>
                </thead>
                {
                    reports.filter((report) => report.status === reportStatus).map((report) => (
                        <tbody className="odd:bg-[#CCCCCC]" key={report.id}>
                            <tr className="[&>td]:p-2">
                                <td>{report.game_name}</td>
                                <td>{report.report}</td>
                                <td>
                                    <select 
                                        className="rounded-lg" 
                                        onChange={(e) => setData("status", e.target.value)}
                                        onKeyDown={(e) => (e.key === "Enter" ? handleChange(report.id) : null)}
                                    >
                                        <option 
                                            value={report.status === "open" ? "open" : "closed"}>
                                            {report.status === "open" ? "open" : "closed"}    
                                        </option>
                                        <option 
                                            value={report.status === "open" ? "closed" : "open"}>
                                            {report.status === "open" ? "closed" : "open"} 
                                        </option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>

        </DashboardLayout>
    )
}