import Layout from "@/Layouts/Layout";
import { GameData } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function SubmitGame () {

    const [hasReleaseDate, setHasReleaseDate] = useState<boolean>()
    const [hasPublisher, setHasPublisher] = useState<boolean>()
    const [hasKickstarter, setHasKickstarter] = useState<boolean>()

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentFormPage, setCurrentFormPage] = useState([
        false,
        false,
        false,
        false,
    ])

    const { data, setData, post, processing, errors, setError } = useForm<GameData&{thumbnail:string}|any>({
        name: '',
        slug: '',
        developer: '',
        publisher: '',
        release_date: '',
        release_window: '',
        demo: undefined,
        early_access: undefined,
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

        // if (currentFormPage[targetPage-1].visitable === false) {
            
        //     return 
        // }

        setCurrentPage(targetPage)

    }

    const checkAnswers = (page:number) => {
        switch (page) {
            case 1:
                let pageOneError = false
                if (data.name === ""){ setError("name", "Please enter the name of the game"), pageOneError = true }
                if (data.developer === ""){ setError("developer", "Please enter the Developer of this game"), pageOneError = true }
                if (hasPublisher === undefined){ setError("publisher_select", "Select a option"), pageOneError = true }
                if (hasPublisher === true && data.publisher === ""){ setError("publisher", "Please enter the Publisher of this game"), pageOneError = true }
                if (hasReleaseDate === undefined){ setError("release_select", "Select a option"), pageOneError = true }
                if (hasReleaseDate === true && data.release_date === ""){ setError("release_date", "Please select a release date"), pageOneError = true }
                if (hasReleaseDate === false && data.release_window === ""){ setError("release_window", "Please enter a release window for this game"), pageOneError = true }
                if (data.trailer === ""){ setError("trailer", "Please provide a YouTube link to a trailer of this game"), pageOneError = true }
                if (data.description === ""){ setError("description", "Please enter a description for this game"), pageOneError = true }
                if (data.thumbnail === ""){ setError("thumbnail", "Please upload a Thumbnail of the game"), pageOneError = true }
                if (pageOneError === false){
                    const updatedCurrentFormPage = [...currentFormPage]
                    updatedCurrentFormPage[0] = true
                    setCurrentFormPage(updatedCurrentFormPage) 
                    setCurrentPage(2)
                }
                break
            case 2:
                let pageTwoError = false
                if (data.demo === undefined){ setError("demo", "Select a option"), pageTwoError = true }
                if (data.early_access === undefined){ setError("early_access", "Select a option"), pageTwoError = true }
                if (hasKickstarter === undefined){ setError("hasKickstarter", "Select a option"), pageTwoError = true }
                if (hasKickstarter === true && data.kickstarter_page === ""){ setError("kickstarter_page", "Please enter the link to the Kickstarter page"), pageTwoError = true }
                if (hasKickstarter === true && data.kickstarter_status === ""){ setError("kickstarter_status", "Select a option"), pageTwoError = true }
                if (pageTwoError === false){
                    const updatedCurrentFormPage = [...currentFormPage]
                    updatedCurrentFormPage[1] = true
                    setCurrentFormPage(updatedCurrentFormPage) 
                    setCurrentPage(3)
                }
                break
            case 3:
                let pageThreeError = false
                if (
                    data.steam === "" &&
                    data.epic === "" &&
                    data.gog === "" &&
                    data.playstation === "" &&
                    data.xbox === "" &&
                    data.nintendo == ""
                ) { setError("platforms","You have not entered the link to any platforms. While none of these are mandatory informations, consider again if you really don't have this information"), pageThreeError }
                if (pageThreeError === false){
                    const updatedCurrentFormPage = [...currentFormPage]
                    updatedCurrentFormPage[2] = true
                    setCurrentFormPage(updatedCurrentFormPage) 
                    setCurrentPage(4)
                }
                break
        }

    }

    function handleSubmit(e:any) {

        e.preventDefault()

        post('/SubmitGames', data)
        console.log(data)
    }

    return(
        <Layout>
            <Head title="Submit a game"/>

            <section className="max-w-[1200px] m-auto flex flex-col p-4 gap-2">

                <h1 className="text-2xl">Submit a Game!</h1>

                <div className="flex flex-col gap-4 items-center">

                    <div className="flex pl-1 gap-1 w-full border-b border-black">
                        <div 
                            className={`
                                ${currentPage === 1 ? "border-b-[#EEEEEE]" : "bg-white" } 
                                ${currentFormPage[0] ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}
                                p-2 -mb-[1px] border border-black rounded-t-md z-10`
                            }
                            onClick={() => currentFormPage[0] ? changeFormPage(currentPage, 1) : null}
                        >
                            Basic Information {currentFormPage[0] ? "✅" : ""}</div>
                        <div 
                            className={`
                                ${currentPage === 2 ? "border-b-[#EEEEEE]" : "bg-white" } 
                                ${currentFormPage[1] ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}
                                p-2 -mb-[1px] border border-black rounded-t-md z-10`
                            }
                            onClick={() => currentFormPage[1] ? changeFormPage(currentPage, 2) : null}
                        >
                            Demo, Early Access & Kickstarter {currentFormPage[1] ? "✅" : ""}</div>
                        <div 
                            className={`
                                ${currentPage === 3 ? "border-b-[#EEEEEE]" : "bg-white" } 
                                ${currentFormPage[2] ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}
                                p-2 -mb-[1px] border border-black rounded-t-md z-10`
                            }
                            onClick={() => currentFormPage[2] ? changeFormPage(currentPage, 3) : null}
                        >
                            Platforms {currentFormPage[2] ? "✅" : ""}</div>
                        <div 
                            className={`
                                ${currentPage === 4 ? "border-b-[#EEEEEE]" : "bg-white" } 
                                ${currentFormPage[3] ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}
                                p-2 -mb-[1px] border border-black rounded-t-md z-10`
                            }
                            onClick={() => currentFormPage[3] ? changeFormPage(currentPage, 4) : null}
                        >
                            Social Media {currentFormPage[3] ? "✅" : ""}</div>
                    </div>

                    <div className="flex flex-col w-full gap-1">
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
                                value={data.name}
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
                                value={data.developer}
                                onChange={(e) => {
                                    hasPublisher 
                                    ? setData("developer", e.target.value)
                                    : (
                                        setData(data => ({ ...data, developer: e.target.value})),
                                        setData(data => ({ ...data, publisher: e.target.value}))
                                    )
                                }}
                                onBlur={(e) => e.target.value === "" ? setError("developer", "Please enter the Developer of this game") : setError("developer", "")}
                            />
                            <span className="text-red-600">{errors.developer}</span>

                            <label>Is the publisher of the game different from the Studio? *</label>
                            <select 
                                name="selectedPublisher"
                                className={`${errors.publisher_select !== "" ? errors.publisher_select !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                onChange={(e) => e.target.value === "yes" ? setHasPublisher(true) : e.target.value === "no" ? (setHasPublisher(false), setData("publisher",data.developer)) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("publisher_select", "Select a option") : setError("publisher_select", "")}
                            >
                                <option disabled selected={hasPublisher === undefined ? true : false}>select an option</option>
                                <option value="yes" selected={hasPublisher === true ? true : false}>Yes</option>
                                <option value="no" selected={hasPublisher === false ? true : false}>No</option>
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
                                        value={data.publisher}
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
                                // ToDo: When you select yes or no, remove the release_select error
                                onChange={(e) => e.target.value === "yes" ? setHasReleaseDate(true) : e.target.value === "no" ? setHasReleaseDate(false) : null }
                                onBlur={(e) => e.target.value === "select an option" ? setError("release_select", "Select a option") : setError("release_select", "")}
                            >
                                <option disabled selected={hasReleaseDate === undefined ? true : false}>select an option</option>
                                <option value="yes" selected={hasReleaseDate === true ? true : false}>Yes</option>
                                <option value="no" selected={hasReleaseDate === false ? true : false}>No</option>
                            </select>
                            <span className="text-red-600">{errors.release_select}</span>
                            {
                                hasReleaseDate !== undefined 
                                ? hasReleaseDate 
                                    ? <>
                                        <label>Release Date: *</label>
                                        <input 
                                            type="date"
                                            className={`${errors.release_date !== "" ? errors.release_date !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                            value={data.release_date}
                                            onChange={(e) => setData("release_date", e.target.value)}
                                            onBlur={(e) => e.target.value === "" ? setError("release_date", "Please select a release date") : setError("release_date", "")}    
                                        />
                                        <span className="text-red-600">{errors.release_date}</span>
                                    </>
                                    : <>
                                        <label>Release Window: *</label>
                                        <input 
                                            type="text" 
                                            placeholder="2025, TBD, Q2 2026, August 2026"
                                            className={`${errors.release_window !== "" ? errors.release_window !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                            value={data.release_window}
                                            onChange={(e) => setData("release_window", e.target.value)}
                                            onBlur={(e) => e.target.value === "" ? setError("release_window", "Please enter a release window for this game") : setError("release_window", "")}
                                        />
                                        <span className="text-red-600">{errors.release_window}</span>
                                    </> 
                                : null
                            }

                            <label>Trailer: *</label>
                            <input 
                                type="text" 
                                placeholder="https://www.youtube.com/watch?v="
                                className={`${errors.trailer !== "" ? errors.trailer !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md` }
                                value={data.trailer}
                                onChange={(e) => setData("trailer", e.target.value)}
                                onBlur={(e) => e.target.value === "" ? setError("trailer", "Please provide a YouTube link to a trailer of this game") : setError("trailer", "")}
                            />
                            <span className="text-red-600">{errors.trailer}</span>

                            <label>Description: *</label>
                            <textarea
                                className={`${errors.description !== "" ? errors.description !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md min-h-[100px]`}
                                placeholder="Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style."
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                onBlur={(e) => e.target.value === "" ? setError("description", "Please enter a description for this game") : setError("description", "")}
                            ></textarea>
                            <span className="text-red-600">{errors.description}</span>
                            <label>Thumbnail: *</label>
                            <input 
                                id="fileUpload"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                className={`border-black rounded-md`}
                                // value={data.thumbnail}
                                onChange={(e) => {
                                    setData('thumbnail', e.target.files?.[0])
                                    setError("thumbnail", "")
                                }}
                                // onBlur={(e) => e.target.value.length < 0 ? setError("thumbnails", "Please upload a Thumbnail of the game") : setError("thumbnails", "")}
                            />
                            <span className="text-red-600">{errors.thumbnail}</span>
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
                                <option disabled selected={data.demo === undefined ? true : false}>select an option</option>
                                <option value="yes" selected={data.demo === 1 ? true : false}>Yes</option>
                                <option value="no" selected={data.demo === 0 ? true : false}>No</option>
                            </select>
                            <span className="text-red-600">{errors.demo}</span>
                            <label>Is this game <b><i>currently</i></b> in Early Access? *</label>
                            <select
                                className={`${errors.early_access !== "" ? errors.early_access !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md`}
                                onChange={(e) => e.target.value === "yes" ? setData("early_access", 1) : e.target.value === "no" ? setData("early_access", 0) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("early_access", "Select a option") : setError("early_access", "")}
                            >
                                <option disabled selected={data.early_access === undefined ? true : false}>select an option</option>
                                <option value="yes" selected={data.early_access === 1 ? true : false}>Yes</option>
                                <option value="no" selected={data.early_access === 1 ? true : false}>No</option>
                            </select>
                            <span className="text-red-600">{errors.early_access}</span>
                            <label>Was this game <b><i>at any point in time</i></b> on Kickstarter? *</label>
                            <select 
                                className={`${errors.hasKickstarter !== "" ? errors.hasKickstarter !== undefined ? "border-red-600" : "border-black" : "border-black"} rounded-md`}
                                onChange={(e) => e.target.value === "yes" ? setHasKickstarter(true) : e.target.value === "no" ? setHasKickstarter(false) : null}
                                onBlur={(e) => e.target.value === "select an option" ? setError("hasKickstarter", "Select a option") : setError("hasKickstarter", "")}
                            >
                                <option disabled selected={hasKickstarter === undefined ? true : false}>select an option</option>
                                <option value="yes" selected={hasKickstarter === true ? true : false}>Yes</option>
                                <option value="no" selected={hasKickstarter === false ? true : false}>No</option>
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
                                        value={data.kickstarter_page}
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
                                            ? setData("kickstarter_status", "Funded") 
                                            : e.target.value === "ongoing" 
                                            ? setData("kickstarter_status", "Ongoing") 
                                            : e.target.value === "upcoming"
                                            ? setData("kickstarter_status", "Upcoming") 
                                            : null
                                        }}
                                        onBlur={(e) => e.target.value === "select an option" ? setError("kickstarter_status", "Select a option") : setError("kickstarter_status", "")}
                                    >
                                        <option disabled selected={data.kickstarter_status === undefined ? true : false}>select an option</option>
                                        <option value="funded" selected={data.kickstarter_status === "Funded" ? true : false}>Funded</option>
                                        <option value="ongoing" selected={data.kickstarter_status === "Ongoing" ? true : false}>Ongoing</option>
                                        <option value="upcoming" selected={data.kickstarter_status === "Upcoming" ? true : false}>Upcoming</option>
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
                                value={data.steam}
                                onChange={(e) => setData("steam", e.target.value)}
                            />

                            <label>Epic:</label>
                            <input 
                                type="text" 
                                placeholder="https://store.epicgames.com/en-US/p/blasphemous" 
                                className="border-black rounded-md"
                                value={data.epic}
                                onChange={(e) => setData("epic", e.target.value)}    
                            />

                            <label>GoG:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.gog.com/en/game/blasphemous" 
                                className="border-black rounded-md"
                                value={data.gog}
                                onChange={(e) => setData("gog", e.target.value)}
                            />

                            <label>Playstation:</label>
                            <input 
                                type="text" 
                                placeholder="https://store.playstation.com/en-us/concept/234422" 
                                className="border-black rounded-md"
                                value={data.playstation}
                                onChange={(e) => setData("playstation", e.target.value)}
                            />

                            <label>Xbox:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.xbox.com/en-US/games/store/blasphemous/9p0478ztxlz4" 
                                className="border-black rounded-md"
                                value={data.xbox}
                                onChange={(e) => setData("xbox", e.target.value)}
                            />

                            <label>Nintendo Switch:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.nintendo.com/us/store/products/blasphemous-switch/" 
                                className="border-black rounded-md"
                                value={data.nintendo}
                                onChange={(e) => setData("nintendo", e.target.value)}
                            />
                            <span className="text-red-600">{errors.platforms}</span>
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
                                value={data.twitter}
                                onChange={(e) => setData("twitter", e.target.value)}
                            />

                            <label>Facebook:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.facebook.com/MetroidvaniaGG" 
                                className="border-black rounded-md"
                                value={data.facebook}
                                onChange={(e) => setData("facebook", e.target.value)}
                            />

                            <label>Instagram:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.instagram.com/metroidvaniagg/" 
                                className="border-black rounded-md"
                                value={data.instagram}
                                onChange={(e) => setData("instagram", e.target.value)}
                            />

                            <label>TikTok:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.tiktok.com/@metroidvaniagg" 
                                className="border-black rounded-md"
                                value={data.tiktok}
                                onChange={(e) => setData("tiktok", e.target.value)}
                            />

                            <label>YouTube:</label>
                            <input 
                                type="text" 
                                placeholder="https://www.youtube.com/@metroidvaniagg"
                                className="border-black rounded-md"
                                value={data.youtube}
                                onChange={(e) => setData("youtube", e.target.value)}
                            />

                            <label>Discord:</label>
                            <input 
                                type="text" 
                                placeholder="https://discord.gg/f64tqHPZCh"
                                className="border-black rounded-md"
                                value={data.discord}
                                onChange={(e) => setData("discord", e.target.value)}
                            />

                            <label>Homepage:</label>
                            <input 
                                type="text" 
                                placeholder="https://metroidvania.gg"
                                className="border-black rounded-md"
                                value={data.website}
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
                                onClick={(e) => handleSubmit(e)}
                            >
                                Submit
                            </button>
                            : <button 
                                className="w-28 p-2 rounded-md bg-white text-black font-bold border border-[#666666] hover:text-mainOrange"
                                // onClick={() => setCurrentPage(currentPage + 1)}
                                // onClick={() => changeFormPage(currentPage, currentPage + 1)}
                                onClick={() => checkAnswers(currentPage)}
                            >
                                Next
                            </button>
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}