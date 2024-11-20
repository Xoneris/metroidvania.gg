// import { useParams } from "react-router-dom";
// import { useState, useEffect, useContext} from 'react';
// import { SocialIcon } from 'react-social-icons'
// import { replaceMonthWithName } from "./functions";
// import { apiUrlContext } from "../Homepage";

import { GameData } from "@/types";
import { replaceMonthWithName } from "@/Utils/replaceMonthWithName";
import Layout from "@/Layouts/Layout";

// import Loading from "./Loading";
// import NotFound from "./NotFound";
// import SteamReview from "./SteamReview";

export default function SingleGamePage ({Game}:any) {

    // const { gameSlug } = useParams();
    // const [gamesData, setGamesData] = useState([]);
    // const [showReportField, setShowReportField] = useState(false)
    // const [response, setResponse] = useState();
    // const apiBaseUrl = useContext(apiUrlContext);
    // const fetchUrl = apiBaseUrl + "/api/games/" + gameSlug;

    // const [loading, setLoading] = useState(false)
    // const [fetchFail, setFetchFail] = useState();

    let currentDate = new Date().toJSON().slice(0, 10);

    const singleGame:GameData = Game.original
    console.log(singleGame)

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
        <Layout>
            <section className="">
                <div className="">
                    <div className="">
                    <h2>{singleGame.name}</h2>
                        <img src={'/assets/thumbnails/' + singleGame.slug + '.jpg'} alt={singleGame.name} title={singleGame.name}  />
                        <h3>Details:</h3>
                        <ul>
                            <li><b>Developer:</b> {singleGame.developer} </li>
                            <li><b>Publisher:</b> {singleGame.publisher}</li>
                            <li><b>Release:</b> {singleGame.release_date ? replaceMonthWithName(singleGame.release_date) : singleGame.release_window}</li>
                        </ul>
                        <hr/>
                        <h3>Demo / EA / Kickstarter:</h3>
                        <ul>
                            <li><b>Has a Demo:</b> {singleGame.demo === true ? 'Yes' : 'No' }</li>
                            <li><b>In Early Access:</b> {singleGame.early_access === true ? 'Yes' : 'No' }</li>
                            <li><b>Kickstarter:</b> {singleGame.kickstarter_page ? <a href={singleGame.kickstarter_page} target="_blank">{singleGame.kickstarter_status}</a> : 'No' }</li>
                        </ul>
                        
                        <hr/>

                        { singleGame.release_date && singleGame.release_date < currentDate ? 
                        <>
                            <h3>Steam reviews:</h3>
                            <ul>
                                {/* <li><SteamReview steamAppID={singleGame.steam ? singleGame.steam.split("/")[4] : null}/></li> */}
                            </ul>
                            <hr/>
                        </>
                        : null}

                        <h3>Social Media:</h3>
                        {/* <ul className="">
                            { singleGame.twitter && (<li><SocialIcon url={singleGame.twitter} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            { singleGame.facebook && (<li><SocialIcon url={singleGame.facebook} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            { singleGame.instagram && (<li><SocialIcon url={singleGame.instagram} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            { singleGame.tiktok && (<li><SocialIcon url={singleGame.tiktok} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            { singleGame.youtube && (<li><SocialIcon url={singleGame.youtube} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            { singleGame.discord && (<li><SocialIcon url={singleGame.discord} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            { singleGame.homepage && (<li><SocialIcon url={singleGame.homepage} bgColor='none' fgColor='black' target="_blank"/></li>) }
                            </ul> */}
                    </div>
                    <div className="">
                        {
                            singleGame.trailer 
                            ? <iframe title={singleGame.name}
                                src={"https://www.youtube.com/embed/"+singleGame.trailer}>
                            </iframe>
                            : <div>
                                Couldn't find a trailer. 
                            </div>
                        }
                        
                        <h2>Description:</h2>
                        <span>{singleGame.description}</span>
                        <hr/>
                            <h3>Platforms:</h3>
                        <ul className="">
                            { singleGame.steam && (<li><a href={singleGame.steam} target="_blank"><img src='/assets/icons/steam.png' alt="Steam Logo" /></a></li>) }
                            { singleGame.epic && (<li><a href={singleGame.epic} target="_blank"><img src="/assets/icons/epic.png" alt="GoG Logo" /></a></li>) }
                            { singleGame.gog && (<li><a href={singleGame.gog} target="_blank"><img src="/assets/icons/gog.png" alt="Epic Games Logo" /></a></li>) }
                            { singleGame.playstation && (<li><a href={singleGame.playstation} target="_blank"><img src="/assets/icons/playstation.png" alt="Playstation Logo" /></a></li>) }
                            { singleGame.xbox && (<li><a href={singleGame.xbox} target="_blank"><img src="/assets/icons/xbox.png" alt="Xbox Logo" /></a></li>) }
                            { singleGame.nintendo && (<li><a href={singleGame.nintendo} target="_blank"><img src="/assets/icons/nintendo-switch.png" alt="Nintendo Switch Logo" /></a></li>) }
                        </ul>
                    </div>
                </div>

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

            </section>
        </Layout>
    )
}