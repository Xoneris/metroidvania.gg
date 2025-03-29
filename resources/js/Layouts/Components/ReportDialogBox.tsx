import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"

export default function ReportDialogBox({gameName, setReport}:{gameName:string, setReport:any}) {

    // const { props } = usePage()
    // const { success }:any = props

    const [success, setSuccesss] = useState<string>("")

    const {data, setData, post, errors, setError} = useForm<any>({
        game_name: gameName,
        report: ""
    })

    function handleClick (e:any) {
        
        e.stopPropagation()
        e.preventDefault()

        if (data.report === "") {
            setError("report", "Please write a report")
            return
        }

        post("/Report", {
            data: data,
            onFinish: () => {
                console.log("Finished!")
                setSuccesss("Report sent! Thank you! We'll fix the issue as soon as we can!")
            }
        })
    }

    return (
        <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80" onClick={() => setReport(false)}>

            <div className="w-96 h-96 p-4 flex flex-col gap-2 justify-around items-center bg-[#EEEEEE] rounded-xl" onClick={(e) => e.stopPropagation()}>
                
                <h2 className="text-2xl">Report for {gameName}</h2>

                <textarea
                    className="w-full h-full resize-none rounded-lg" 
                    placeholder="Please describe the wrong, outdated or missing information and provide the correct one if possible."
                    value={data.report}
                    onChange={(e) => setData('report',e.target.value)}
                    onBlur={(e) => e.target.value === "" ? setError("report", "Please write a report") : setError("report", "") }
                ></textarea>

                <p className="text-red-700">
                    {errors.report}  
                </p>

                <p className="text-green-700">
                  {success}  
                </p>

                <button 
                    className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange" 
                    onClick={(e) => handleClick(e)}
                >
                    Send Report
                </button>
            </div>

        </div>
    )
}