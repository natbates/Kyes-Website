import { useState, useEffect } from "react";
import "../styles/home.css";
import "../styles/discord.css";
import { Link } from 'react-router-dom';
import Loading from "../comps/loading";

const Home = () => {
    const [currentSongData, setCurrentSongData] = useState(null);
    const [discordStatus, setDiscordStatus] = useState(null); 
    const [spotifyError, setSpotifyError] = useState(null);
    const [discordError, setDiscordError] = useState(null);
    const [socket, setSocket] = useState(null);
    
    const discordUserId = process.env.REACT_APP_DISCORD_USER_ID;
    useEffect(() => {
        let retryCount = 0;
        const maxRetries = 3;
        
        const connectWebSocket = () => {
            const newSocket = new WebSocket("wss://api.lanyard.rest/socket");
            

            newSocket.onopen = () => {
                newSocket.send(JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: discordUserId
                    }
                }));
                setSocket(newSocket);
                setDiscordError(null);
            };

            newSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);

                switch (data.op) {
                    case 0: 
                        handlePresenceUpdate(data.d);
                        break;
                    case 1: 
                        const heartbeat = setInterval(() => {
                            if (newSocket.readyState === WebSocket.OPEN) {
                                newSocket.send(JSON.stringify({ op: 3 }));
                            }
                        }, data.d.heartbeat_interval);
                        
                        newSocket.heartbeatInterval = heartbeat;
                        break;
                    default:
                        console.log("Unhandled message type:", data.op);
                }
            };

            newSocket.onerror = (error) => {
                console.error("WebSocket Error: ", error);
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Connection failed, retrying... (${retryCount}/${maxRetries})`);
                    setTimeout(connectWebSocket, 2000);
                } else {
                    setDiscordError("Unable to connect to Discord after multiple attempts");
                }
            };

            newSocket.onclose = (event) => {
                if (newSocket.heartbeatInterval) {
                    clearInterval(newSocket.heartbeatInterval);
                }
                
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(connectWebSocket, 2000);
                }
            };

            return newSocket;
        };

        const wsConnection = connectWebSocket();

        return () => {
            if (wsConnection) {
                if (wsConnection.heartbeatInterval) {
                    clearInterval(wsConnection.heartbeatInterval);
                }
                wsConnection.close();
            }
        };
    }, [discordUserId]);

    const handlePresenceUpdate = (data) => {

        if (data.discord_status) {
            setDiscordStatus({
                status: data.discord_status,
                activity: data.activities?.[0]?.name || null
            });
        }

        if (data.spotify && data.listening_to_spotify) {
            setCurrentSongData({
                item: {
                    name: data.spotify.song,
                    artists: [{ name: data.spotify.artist, external_urls: { spotify: data.spotify.artist_url } }],
                    external_urls: { songlink: `https://open.spotify.com/track/${data.spotify.track_id}`, artist_url: `https://open.spotify.com/search/${data.spotify.artist}`},
                },
            });
            setSpotifyError(null);
        } else {
            setCurrentSongData(null);
            setSpotifyError("User is not currently listening to Spotify.");
        }
    };

    console.log("Data" ,currentSongData);

    return (
        <div id="home">
            <h1 id="name">Hey, I'm Kye</h1>
            <p>Astrophysist at the University of Leicester</p>
            <div className="service-text">
                {spotifyError ? (
                    <span>
                        <img className="service-image" src="images/spotify.png" alt="Spotify logo" />
                        Listening to: Nothing
                    </span>
                ) : (
                    <span>
                        <img className="service-image" src="images/spotify.png" alt="Spotify logo" />
                        Listening to: {currentSongData === null ? (
                            <Loading className="service-loader" />
                        ) : (
                            <>
                                <a className="highlighted" href={currentSongData.item.external_urls.songlink} target="_blank" rel="noopener noreferrer">
                                    {currentSongData.item.name}
                                </a>
                                {' '}by{' '}
                                <a className="highlighted" href={currentSongData.item.external_urls.artist_url} target="_blank" rel="noopener noreferrer">
                                    {currentSongData.item.artists[0].name}
                                </a>
                            </>
                        )}
                    </span>
                )}
            </div>
            <div className="service-text">
                {discordError ? (
                    <div className="error-message">{discordError}</div>
                ) : (
                    <span>
                        <img className="service-image" src="images/discord.png" alt="Discord logo" />
                        Discord status: {discordStatus === null ? (
                            <Loading className="service-loader" />
                        ) : (
                            <span>
                                <div className={`${discordStatus.status || "offline"} circle`}></div>
                                {' '}{discordStatus.status}
                            </span>
                        )}
                    </span>
                )}
            </div>
            <Link to="/contact">
                <button id="contact-me">Contact me</button>
            </Link>
        </div>
    );
}

export default Home;