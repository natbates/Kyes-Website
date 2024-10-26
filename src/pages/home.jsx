import { useState } from "react";
import "../styles/home.css";
import { Link } from 'react-router-dom';
import Loading from "../comps/loading";
import {fetchCurrentSong} from "../util/api.js";
import { useEffect } from "react";

const Home = () =>
{

    const [discordStatus, setDiscordStatus] = useState(null);
    const [currentSongData, setCurrentSongData] = useState(null); 
    const [error, setError] = useState(null);

    const fetchSongData = async () => {
        try {
            setError(null);
            const songData = await fetchCurrentSong(); 
            setCurrentSongData(songData); 
            
        } catch (err) {
            setError(err.message);
            setCurrentSongData(null);
        }
    };

    useEffect(() => {

        fetchSongData(); 
        
    }, []); 

    return(
        <div id = "home">
            <h1 id = "name">Kye</h1>
            <p>Astrophysist at the University of Leicster</p>
            <div className = "service-text">
                {error ? <div className="error-message">Error fetching Spotify data</div> :
                <span><img className = "service-image" src = "images/spotify.png"></img> Listening to: {currentSongData === null ? <Loading className = "service-loader"/> : <p>{currentSong}</p>}</span>
                }
            </div>
            <div className = "service-text">
                <span><img className = "service-image" src = "images/discord.png"></img> Discord status: {discordStatus === null ? <Loading className = "service-loader"/> : <p>{discordStatus}</p>}</span>
            </div>
            <Link to="/contact"><button id = "contact-me">Contact me</button></Link>
        </div>
    );
}

export default Home;