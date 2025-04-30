import Layout from "@/Layouts/Layout";
import { GameData } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function SubmitGame () {

    const [hasReleaseDate, setHasReleaseDate] = useState<boolean>()
    const [hasPublisher, setHasPublisher] = useState<boolean>()
    const [hasKickstarter, setHasKickstarter] = useState<boolean>()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [currentFormPage, setCurrentFormPage] = useState([
        { page: 1, visitable: false},
        { page: 2, visitable: false},
        { page: 3, visitable: false},
        { page: 4, visitable: false},
    ])

    const { data, setData, post, processing, errors, setError } = useForm<GameData|any>({
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

    const changeFormPage = (currentPage:number, targetPage:number) => {

        if (currentFormPage[targetPage-1].visitable === false) {
            
            return 
        }

        setCurrentPage(targetPage)

    }

    return(
        <Layout>
            <Head title="Submit a game"/>

            <section className="max-w-[1200px] m-auto flex flex-col p-4 gap-2">

                <h1 className="text-2xl">Submit a Game!</h1>

                <div className="flex flex-col gap-4 items-center">

                    <div className="flex pl-1 gap-1 w-full border-b border-black">
                        <div 
                            className={` ${currentPage === 1 ? "border-b-[#EEEEEE]" : "bg-white" } p-2 -mb-[1px] border border-black rounded-t-md z-10`}
                            // onClick={() => setCurrentPage(1)}
                            onClick={() => changeFormPage(currentPage, 1)}
                        >
                            Basic Information {currentFormPage[0].visitable ? "✅" : "❌"}</div>
                        <div 
                            className={` ${currentPage === 2 ? "border-b-[#EEEEEE]" : "bg-white" } p-2 -mb-[1px] border border-black rounded-t-md z-10`}
                            // onClick={() => setCurrentPage(2)}
                            onClick={() => changeFormPage(currentPage, 2)}
                        >
                            Demo, Early Access & Kickstarter {currentFormPage[1].visitable ? "✅" : "❌"}</div>
                        <div 
                            className={` ${currentPage === 3 ? "border-b-[#EEEEEE]" : "bg-white" } p-2 -mb-[1px] border border-black rounded-t-md z-10`}
                            // onClick={() => setCurrentPage(3)}
                            onClick={() => changeFormPage(currentPage, 3)}
                        >
                            Platforms {currentFormPage[2].visitable ? "✅" : "❌"}</div>
                        <div 
                            className={` ${currentPage === 4 ? "border-b-[#EEEEEE]" : "bg-white" } p-2 -mb-[1px] border border-black rounded-t-md z-10`}
                            // onClick={() => setCurrentPage(4)}
                            onClick={() => changeFormPage(currentPage, 4)}
                        >
                            Social Media {currentFormPage[3].visitable ? "✅" : "❌"}</div>
                    </div>

                    <div className="flex flex-col w-full">
                        {/* ### First Page of the Form ### */}
                        {
                            currentPage === 1
                            ? <>
                            <label>Game Name: *</label>
                            <input 
                                type="text"
                                name="gameName"
                                placeholder="Hollow Knight"
                                className={`${errors.name !== "" ? errors.name !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                onChange={(e) => {
                                    setData(data => ({ ...data, name: e.target.value}));
                                    setData(data => ({ ...data, slug: e.target.value.replaceAll(" ","-").toLowerCase()}));
                                }}
                                onBlur={(e) => e.target.value === "" ? setError("name", "Please enter the name of the game") : setError("name", "")} 
                            />
                            <span className="text-red-600">{errors.name}</span>

                            <label>Developer: *</label>
                            <input 
                                type="text" 
                                placeholder="My cool Studio"
                                className={`${errors.developer !== "" ? errors.developer !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                onChange={(e) => setData("developer", e.target.value)}
                                onBlur={(e) => e.target.value === "" ? setError("developer", "Please enter the Developer of this game") : setError("developer", "")}
                            />
                            <span className="text-red-600">{errors.developer}</span>

                            <label>Is the publisher of the game different from the Studio? *</label>
                            <select 
                                name="selectedPublisher"
                                className={`${errors.publisher_select !== "" ? errors.publisher_select !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                onChange={(e) => e.target.value === "yes" ? setHasPublisher(true) : e.target.value === "no" ? setHasPublisher(false) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("publisher_select", "Select a option") : setError("publisher_select", "")}
                            >
                                <option disabled selected>select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <span className="text-red-600">{errors.publisher_select}</span>
                            {
                                hasPublisher 
                                ? <>
                                    <label>Publisher: *</label>
                                    <input 
                                        type="text" 
                                        placeholder="My cool Publisher" 
                                        className={`${errors.publisher !== "" ? errors.publisher !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                        onChange={(e) => setData("publisher", e.target.value)}
                                        onBlur={(e) => e.target.value === "" ? setError("publisher", "Please enter the Publisher of this game") : setError("publisher", "")}
                                    />
                                    <span className="text-red-600">{errors.publisher}</span>
                                </>
                                : null
                            }
                            <label>Is this game already released or does it have a fixed Release Date yet? *</label>
                            <select 
                                name="selectedReleaseDate"
                                className={`${errors.release_select !== "" ? errors.release_select !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                // When you select yes or no, remove the release_select error
                                onChange={(e) => e.target.value === "yes" ? setHasReleaseDate(true) : e.target.value === "no" ? setHasReleaseDate(false) : null }
                                onBlur={(e) => e.target.value === "select an option" ? setError("release_select", "Select a option") : setError("release_select", "")}
                            >
                                <option disabled selected >select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <span className="text-red-600">{errors.release_select}</span>
                            {
                                hasReleaseDate !== undefined 
                                ? hasReleaseDate 
                                    ? <>
                                        <label>Release Date: *</label>
                                        <input 
                                            type="date"
                                            className={`${errors.release_date !== "0000-00-00" ? errors.release_date !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                            onChange={(e) => setData("release_date", e.target.value)}    
                                        />
                                        <span className="text-red-600">{errors.release_date}</span>
                                    </>
                                    : <>
                                        <label>Release Window: *</label>
                                        <input 
                                            type="text" 
                                            placeholder="2025, TBD, Q2 2026, August 2026"
                                            className={`${errors.release_window !== "" ? errors.release_window !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                            onChange={(e) => setData("release_window", e.target.value)}
                                            onBlur={(e) => e.target.value === "" ? setError("release_window", "Please enter a release window for this game") : setError("release_window", "")}
                                        />
                                        <span className="text-red-600">{errors.release_window}</span>
                                    </> 
                                : null
                            }
                            <label>Description: *</label>
                            <textarea
                                className={`${errors.description !== "" ? errors.description !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md min-h-[100px]`}
                                placeholder="Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style."
                                onChange={(e) => setData("description", e.target.value)}
                                onBlur={(e) => e.target.value === "" ? setError("description", "Please enter a description for this game") : setError("description", "")}
                            ></textarea>
                            <span className="text-red-600">{errors.description}</span>
                            </>
                            : null
                        }
                        {/* ### Second Page of the Form ### */}
                        {
                            currentPage === 2
                            ? <>
                            <label>Does this game <b><i>currently</i></b> have a Demo? *</label>
                            <select
                                className={`${errors.demo !== "" ? errors.demo !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md`}
                                onChange={(e) => e.target.value === "yes" ? setData("demo", 1) : e.target.value === "no" ? setData("demo", 0) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("demo", "Select a option") : setError("demo", "")}
                            >
                                <option disabled selected >select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <span className="text-red-600">{errors.demo}</span>
                            <label>Is this game <b><i>currently</i></b> in Early Access? *</label>
                            <select
                                className={`${errors.early_access !== "" ? errors.early_access !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md`}
                                onChange={(e) => e.target.value === "yes" ? setData("early_access", 1) : e.target.value === "no" ? setData("early_access", 0) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("early_access", "Select a option") : setError("early_access", "")}
                            >
                                <option disabled selected >select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <span className="text-red-600">{errors.early_access}</span>
                            <label>Was this game <b><i>at any point in time</i></b> on Kickstarter? *</label>
                            <select 
                                className={`${errors.hasKickstarter !== "" ? errors.hasKickstarter !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md`}
                                onChange={(e) => e.target.value === "yes" ? setHasKickstarter(true) : e.target.value === "no" ? setHasKickstarter(false) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("hasKickstarter", "Select a option") : setError("hasKickstarter", "")}
                            >
                                <option disabled selected >select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <span className="text-red-600">{errors.hasKickstarter}</span>
                            {
                                hasKickstarter === true 
                                ? <>
                                    <label>Kickstarter Page: *</label>
                                    <input 
                                        type="text" 
                                        placeholder="https://www.kickstarter.com/projects/squidshockstudios/bo-a-hand-drawn-2d-adventure-based-on-japanes"
                                        className={`${errors.kickstarter_page !== "" ? errors.kickstarter_page !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                        onChange={(e) => setData("kickstarter_page", e.target.value)}
                                        onBlur={(e) => e.target.value === "" ? setError("kickstarter_page", "Please enter the link to the Kickstarter page") : setError("kickstarter_page", "")}
                                    />
                                    <span className="text-red-600">{errors.kickstarter_page}</span>
                                </>
                                : null
                            }
                            {
                                hasKickstarter === true 
                                ? <>
                                    <label>Kickstarter status: *</label>
                                    <select
                                        className={`${errors.kickstarter_status !== "" ? errors.kickstarter_status !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md`}
                                        onChange={(e) => {
                                            e.target.value === "funded" 
                                            ? setData("kickstarter_option", "funded") 
                                            : e.target.value === "ongoing" 
                                            ? setData("kickstarter_option", "ongoing") 
                                            : e.target.value === "upcoming"
                                            ? setData("kickstarter_option", "upcoming") 
                                            : null
                                        }}
                                        onBlur={(e) => e.target.value === "select an option" ? setError("kickstarter_status", "Select a option") : setError("kickstarter_status", "")}
                                    >
                                        <option disabled selected >select an option</option>
                                        <option value="funded">Funded</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="upcoming">Upcoming</option>
                                    </select>
                                    <span className="text-red-600">{errors.kickstarter_status}</span>
                                </>
                                : null
                            }
                            </>
                            : null
                        }
                        {/* ### Third Page of the Form ### */}
                        {
                            currentPage === 3
                            ? <>
                            <p>Everything below is optional</p>
                            <label>Steam:</label>
                            <input 
                                type="text" 
                                placeholder="https://store.steampowered.com/app/774361/Blasphemous/"
                                className="border-black rounded-md"
                                onChange={(e) => setData("steam", e.target.value)}
                            />

                            <label>Epic:</label>
                            <input 
                                type="text" 
                                placeholder="https://store.epicgames.com/en-US/p/blasphemous" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("epic", e.target.value)}    
                            />

                            <label>GoG:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.gog.com/en/game/blasphemous" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("gog", e.target.value)}
                            />

                            <label>Playstation:</label>
                            <input 
                                type="text" 
                                placeholder="https://store.playstation.com/en-us/concept/234422" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("playstation", e.target.value)}
                            />

                            <label>Xbox:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.xbox.com/en-US/games/store/blasphemous/9p0478ztxlz4" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("xbox", e.target.value)}
                            />

                            <label>Nintendo Switch:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.nintendo.com/us/store/products/blasphemous-switch/" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("nintendo", e.target.value)}
                            />
                            </>
                            : null
                        }
                        {/* ### Forth Page of the Form ### */}
                        {
                            currentPage === 4
                            ? <>
                            <p>Everything below is optional</p>
                            <label>Twitter/X:</label>
                            <input 
                                type="text" 
                                placeholder="https://twitter.com/metroidvania.gg"
                                className="border-black rounded-md"
                                onChange={(e) => setData("twitter", e.target.value)}
                            />

                            <label>Facebook:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.facebook.com/MetroidvaniaGG" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("facebook", e.target.value)}
                            />

                            <label>Instagram:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.instagram.com/metroidvaniagg/" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("instagram", e.target.value)}
                            />

                            <label>TikTok:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.tiktok.com/@metroidvaniagg" 
                                className="border-black rounded-md"
                                onChange={(e) => setData("tiktok", e.target.value)}
                            />

                            <label>YouTube:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.youtube.com/@metroidvaniagg"
                                className="border-black rounded-md"
                                onChange={(e) => setData("youtube", e.target.value)}
                            />

                            <label>Discord:</label>
                            <input 
                                type="text" 
                                placeholder="https://discord.gg/f64tqHPZCh"
                                className="border-black rounded-md"
                                onChange={(e) => setData("discord", e.target.value)}
                            />

                            <label>Homepage:</label>
                            <input 
                                type="text" 
                                placeholder="https://metroidvania.gg"
                                className="border-black rounded-md"
                                onChange={(e) => setData("website", e.target.value)}
                            />
                            </>
                            : null
                        }

                    </div>

                    <div className="flex w-full justify-between px-10">
                        {
                            currentPage === 1
                            ? <p></p>
                            : <button 
                                className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                // onClick={() => setCurrentPage(currentPage - 1)}
                                onClick={() => changeFormPage(currentPage, currentPage - 1)}
                            >
                                Previous
                            </button>
                        }
                        {
                            currentPage === 4
                            ? <button 
                                className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                // onClick={() => handleSubmit}
                            >
                                Submit
                            </button>
                            : <button 
                                className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                // onClick={() => setCurrentPage(currentPage + 1)}
                                onClick={() => changeFormPage(currentPage, currentPage + 1)}
                            >
                                Next
                            </button>
                        }
                    </div>

                    <div className="flex flex-col gap">
                        <p>{data.name}</p>
                        <p>{data.slug}</p>
                        <p>{data.developer}</p>
                        <p>{data.publisher}</p>
                        <p>{data.release_date}</p>
                        <p>{data.release_window}</p>
                        <p>{data.description}</p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}