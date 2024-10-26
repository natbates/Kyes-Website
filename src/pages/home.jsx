import { useState } from "react";
import "../styles/home.css";
import { Link } from 'react-router-dom';
import Loading from "../comps/loading";
import {fetchCurrentSong} from "../util/api.js";
import { fetchDiscordStatus } from "../util/api.js";
import { useEffect } from "react";

const Home = () =>
{

    const [discordStatus, setDiscordStatus] = useState(null);
    const [currentSongData, setCurrentSongData] = useState(null); 
    const [spotiftyError, setSpotifyError] = useState(null);
    const [discordError, setDiscordError] = useState(null);


    const fetchSongData = async () => {
        try {
            setSpotifyError(null);
            const songData = await fetchCurrentSong(); 
            setCurrentSongData(songData);
        } catch (err) {
            setSpotifyError(err.message);
            setCurrentSongData(null);
        }
    };

    const fetchDiscordData = async () => {
        try {
            setDiscordError(null);
            const discordData = await fetchDiscordStatus();
            console.log(discordData);
            setDiscordStatus(discordData);
        } catch (err) {
            setDiscordError(err);
            setDiscordStatus(null);
        }
    }

    useEffect(() => {
        fetchSongData(); 
        fetchDiscordData();
    }, []); 

    return(
        <div id = "home">
            <h1 id = "name">Hey, I'm Kye</h1>
            <p>Astrophysist at the University of Leicester</p>
            <div className = "service-text">
                {spotiftyError ? <div className="error-message">{spotiftyError}</div> :
                <span>
                    <img className = "service-image" src = "images/spotify.png" alt="Spotify logo"></img> Listening to: {currentSongData === null ? <Loading className = "service-loader"/> : 
                    <> 
                        {currentSongData.message != null && currentSongData.item ? 
                        <>
                        <a className = "highlighted" href={currentSongData.item.external_urls.spotify} target="_blank" rel="noopener noreferrer">{currentSongData.item.name}</a>
                            by 
                        <a className = "highlighted" href={currentSongData.item.artists[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">{currentSongData.item.artists[0].name}</a>
                        </>
                         : 
                        <div> &nbsp;Nothing</div>
                        }
                    </>}
                </span>
                }
            </div>
            <div className = "service-text">
                {discordError ? <div className="error-message">{discordError}</div> :
                <span>
                    <img className = "service-image" src = "images/discord.png" alt="Discord logo"></img> 
                    Discord status: {discordStatus === null ? <Loading className = "service-loader"/> : <><div className={`${discordStatus?.status || "offline"} circle`}></div> {discordStatus.status} </>
                    }
                </span>
                }
            </div>
            <Link to="/contact"><button id = "contact-me">Contact me</button></Link>
        </div>
    );
}

export default Home;
