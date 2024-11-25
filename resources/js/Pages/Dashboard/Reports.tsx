import DashboardLayout from "@/Layouts/DashboardLayout";
import { Report } from "@/types";
import { useState } from "react";

export default function Reports ({reports}:{reports:Report[]}) {

    const [reportStatus, setReportStatus] = useState<string>("open")

    return (
        <DashboardLayout>

            <h2 className="text-3xl">Reports</h2>
            
            <div className="flex gap-2">
                <div 
                    className={reportStatus === "open" ? "active" : ""} 
                    onClick={() => {setReportStatus("open")}}
                >
                    Open Report
                </div>
                <div 
                    className={reportStatus === "closed" ? "active" : ""} 
                    onClick={() => {setReportStatus("closed")}}
                >
                    Closed Reports
                </div>
            </div>

            <table className="w-full">
                <thead className="bg-black text-mainOrange font-bold [&>td]:p-2">
                    <td>Game</td>
                    <td>Report</td>
                    <td>Status</td>
                </thead>
                {
                    reports.filter((report) => report.status === reportStatus).map((report) => (
                        <tbody className="odd:bg-[#CCCCCC] [&>td]:p-2">
                            <td>{report.game_name}</td>
                            <td>{report.report}</td>
                            <td>{report.status}</td>
                        </tbody>
                    ))
                }
            </table>

        </DashboardLayout>
    )
}