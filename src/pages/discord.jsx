import "../styles/discord.css";
import Loading from "../comps/loading";
import { useState } from "react";

const Discord = () => {

    const [onlineMembers, setOnlineMembers] = useState(null)
    const [totalMembers, setTotalMembers] = useState(null)

    return(
        <div id = "discord">
            <h1>Discord</h1>
            <p>Check out my discord server..</p>
            <div id = "discord-info-text">
                <span>Online members: {onlineMembers === null ? <Loading className = "service-loader"/> : <p>{onlineMembers}</p>}</span>
                <span>Total members: {totalMembers === null ? <Loading className = "service-loader"/> : <p>{totalMembers}</p>}</span>
                <button>Join</button>
            </div>
            <div id = "members">
                <h2>Members</h2>
                <p>Here are some of the members in our discord!</p>
                <Loading delay = "members-delay" className = "discord-loader"/>
            </div>
            <div id = "roles">
                <h2>Roles</h2>
                <p>Here are the available roles!</p>
                <Loading delay = "roles-delay" className = "discord-loader"/>
            </div>
            <div id = "channels">
                <h2>Channels</h2>
                <p>Here are some of the channels in our discord!</p>
                <Loading delay = "channels-delay" className = "discord-loader"/>
            </div>        
        </div>
    );
}

export default Discord;