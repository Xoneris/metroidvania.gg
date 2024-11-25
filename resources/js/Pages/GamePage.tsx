// import { useParams } from "react-router-dom";
// import { useState, useEffect, useContext} from 'react';
// import { SocialIcon } from 'react-social-icons'
// import { replaceMonthWithName } from "./functions";
// import { apiUrlContext } from "../Homepage";

import { GameData } from "@/types";
import { replaceMonthWithName } from "@/Utils/replaceMonthWithName";
import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import SteamReview from "@/Components/SteamReviews";
import { SocialIcon } from "react-social-icons";

// import Loading from "./Loading";
// import NotFound from "./NotFound";
// import SteamReview from "./SteamReview";

export default function GamePage ({singleGame, reviews}:{singleGame:GameData, reviews:any}) {

    // const { gameSlug } = useParams();
    // const [gamesData, setGamesData] = useState([]);
    // const [showReportField, setShowReportField] = useState(false)
    // const [response, setResponse] = useState();
    // const apiBaseUrl = useContext(apiUrlContext);
    // const fetchUrl = apiBaseUrl + "/api/games/" + gameSlug;

    // const [loading, setLoading] = useState(false)
    // const [fetchFail, setFetchFail] = useState();

    let currentDate = new Date().toJSON().slice(0, 10);

    // const singleGame:GameData = Game.original
    // console.log(singleGame)

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const reportMessage = e.target.elements["gameReport"].value;

    //     const reportData = {
    //         game: gamesData.name,
    //         report: reportMessage,
    //         status: "open",
    //     }

    //     try {
    //         const res = await fetch( apiBaseUrl + "/api/report", {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(reportData),
    //         })
    //         const result = await res.json();
    //         setResponse(result);
    //       } catch (error) {
    //         console.error('Error making POST request:', error);
    //       }
    // }

    // if (loading) {
    //     return <Loading/>
    // }

    // if (fetchFail) {
    //     return <NotFound/>
    // }

    return (
        <>
            <Head title={singleGame.name}/>

            <Layout>

                <section className="flex gap-2 w-full max-w-[1600px] m-auto p-4">

                    <div className="flex flex-col gap-2 w-full max-w-[460px]">

                        <h1 className="text-2xl font-bold">{singleGame.name}</h1>
                        <img src={'/assets/thumbnails/' + singleGame.slug + '.jpg'} alt={singleGame.name} className="rounded-xl"/>
                        <h2 className="text-2xl">Details:</h2>
                        <ul className="pl-4">
                            <li><b>Developer:</b> {singleGame.developer} </li>
                            <li><b>Publisher:</b> {singleGame.publisher}</li>
                            <li><b>Release: </b> 
                                {
                                    singleGame.release_date !== "0000-00-00"
                                    ? replaceMonthWithName(singleGame.release_date) 
                                    : singleGame.release_window
                                }   
                            </li>
                        </ul>
                        <hr className="bg-black w-full h-1"/>
                        <h2 className="text-2xl">Demo / EA / Kickstarter:</h2>
                        <ul className="pl-4">
                            <li><b>Has a Demo: </b> 
                                {
                                    singleGame.demo === true || singleGame.demo === 1 
                                    ? 'Yes' 
                                    : 'No' 
                                }
                            </li>
                            <li><b>In Early Access: </b> 
                                {
                                    singleGame.early_access === true || singleGame.early_access === 1 
                                    ? 'Yes' 
                                    : 'No' 
                                }
                            </li>
                            <li><b>Kickstarter: </b> 
                                {
                                    singleGame.kickstarter_page 
                                    ? <a href={singleGame.kickstarter_page} target="_blank" className="text-mainOrange font-bold hover:underline">
                                        {singleGame.kickstarter_status}
                                    </a> 
                                    : 'No' 
                                }
                            </li>
                        </ul>
                        
                        <hr className="bg-black w-full h-1"/>

                        { 
                            singleGame.release_date && singleGame.release_date < currentDate 
                                ? <>
                                    <h2 className="text-2xl">Reviews:</h2>
                                    <ul>
                                        <li className="pl-4">
                                            <SteamReview reviews={reviews}/>
                                        </li>
                                    </ul>
                                    <hr className="bg-black w-full h-1"/>
                                </>
                                : null
                        }

                        <h2 className="text-2xl">Social Media:</h2>
                        <ul className="flex pl-4 gap-2">
                            { singleGame.twitter && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.twitter} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            { singleGame.facebook && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.facebook} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            { singleGame.instagram && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.instagram} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            { singleGame.tiktok && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.tiktok} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            { singleGame.youtube && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.youtube} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            { singleGame.discord && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.discord} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            { singleGame.homepage && (
                                <li>
                                    <SocialIcon className="transition-all hover:scale-125" url={singleGame.homepage} bgColor='none' fgColor='black' target="_blank"/>
                                </li>) }
                            </ul>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        {
                            singleGame.trailer !== "0"
                            ? <iframe title={singleGame.name} className="aspect-video w-full rounded-xl"
                                src={"https://www.youtube.com/embed/"+singleGame.trailer}>
                            </iframe>
                            : <div className="w-full h-full border-black rounded-xl flex justify-center items-center border">
                                <span className="text-4xl">
                                    Couldn't find a trailer :(
                                </span>
                            </div>
                        }
                        
                        <h2 className="text-2xl">Description:</h2>
                        <span className="pl-4">{singleGame.description}</span>

                        <hr className="bg-black w-full h-1"/>

                        <h2 className="text-2xl">Platforms:</h2 >
                        <ul className="pl-4 flex gap-8 items-center">
                            { singleGame.steam && (
                                <li>
                                    <a href={singleGame.steam} 
                                        target="_blank"><img src='/assets/icons/steam.png' 
                                        className="w-8 transition-all hover:scale-125" 
                                        alt="Steam Logo" /></a>
                                </li>) }
                            { singleGame.epic && (
                                <li>
                                    <a href={singleGame.epic} 
                                        target="_blank"><img src="/assets/icons/epic.png" 
                                        className="w-8 transition-all hover:scale-125" 
                                        alt="GoG Logo" /></a>
                                </li>) }
                            { singleGame.gog && (
                                <li>
                                    <a href={singleGame.gog} 
                                        target="_blank"><img src="/assets/icons/gog.png" 
                                        className="w-8 transition-all hover:scale-125" 
                                        alt="Epic Games Logo" /></a>
                                </li>) }
                            { singleGame.playstation && (
                                <li>
                                    <a href={singleGame.playstation} 
                                        target="_blank"><img src="/assets/icons/playstation.png" 
                                        className="w-8 transition-all hover:scale-125" 
                                        alt="Playstation Logo" /></a>
                                </li>) }
                            { singleGame.xbox && (
                                <li>
                                    <a href={singleGame.xbox} 
                                        target="_blank"><img src="/assets/icons/xbox.png" 
                                        className="w-8 transition-all hover:scale-125" 
                                        alt="Xbox Logo" /></a>
                                </li>) }
                            { singleGame.nintendo && (
                                <li>
                                    <a href={singleGame.nintendo} 
                                        target="_blank"><img src="/assets/icons/nintendo-switch.png" 
                                        className="w-8 transition-all hover:scale-125" 
                                        alt="Nintendo Switch Logo" /></a>
                                </li>) }
                        </ul>
                    </div>

                </section>

                {/* <div className="ReportButton" onClick={() => {setShowReportField(!showReportField)}}>
                    <b>!</b>
                    </div>
                    <div className="ReportContainer" id={showReportField ? "show" : "hide"} >
                    <form onSubmit={handleSubmit}>
                    <h2>Report Issue</h2>
                    <p>Is any information on this page wrong, outdated or missing? Please report the issue below and hopefully it will be fixed soon! Thank you for your help!</p>
                    <textarea name="gameReport" placeholder="Please describe the wrong, outdated or missing information and provide the correct one if possible."></textarea>
                    <br/>
                    <button type="submit">Submit Report</button>
                    {response ? <p>{response}</p> : null}
                    </form>
                    </div> */}

            </Layout>
        </>
    )
}