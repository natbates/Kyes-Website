import "../styles/dashboard.css";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Loading from "../comps/loading";
import { useEffect } from "react";

const Dashboard = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.loading) {
            navigate("/login"); // Make sure this matches your actual route
        }
    }, [auth.isAuthenticated, auth.loading, navigate]);

    if (auth.loading) {
        return <Loading />;
    }

    return (
        <div id="dashboard">
            <h1>Dashboard</h1>
            <p>Here is the sites interactive dashboard. Upload and remove images from the sites page.</p>
            <div id = "upload-image-container">
                <h2>Upload an image</h2>
                <p>Use the file upload button below to upload your image to the site</p>
                <input
                    type="file"
                    id = "photo-input"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            console.log("File selected:", file.name);
                            // Add your file upload logic here
                        }
                    }}
                />
                <input 
                    type = "submit"
                    id = "photo-submit"
                />
            </div>

            <div id = "remove-image-container">
                <h2>Remove images</h2>
                <p>Scroll through the images and click the ones you wish to remove.</p>
                <Loading delay = "one-five-seconds" />
            </div>

            <div id = "discord-link-container">
                <h2>Change Discord Server</h2>
                <p>Change and migrate your chosen discord server.</p>
                <input id = "discord-text-field" type = "text"></input>
                <input 
                    type = "submit"
                    id = "discord-submit"
                />
            </div>
        </div>
    );
};

export default Dashboard;
