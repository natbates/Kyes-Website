import "../styles/photos.css";
import { useEffect, useState } from "react";
import Loading from "../comps/loading.jsx";

const Photos = () => {

    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        const photoContainer = document.getElementById("photo-container");
        if (photoContainer) {
            const photos = photoContainer.children;
            for (let i = 0; i < photos.length; i++) {
                photos[i].style.animationDelay =  `${i * 0.1 + 0.5}s`;
                photos[i].addEventListener('animationend', () => {
                    photos[i].style.pointerEvents = "auto"; // Enable pointer events after animation
                }, { once: true });
            }
        } else {
            console.log("photo container not found");
        }
    }, [photos]); // Add projects to the dependency array

    return (
        <div id="photos">
            <h1>Photos</h1>
            <p>Here are some of my favourite space photos!</p>
            <div id="photo-container">
                {photos.length > 0 ? 
                    projects.map((photos, index) => (
                        <></>
                    )) : <Loading delay = "point-five-seconds"/>}
            </div>
        </div>
    );
};

export default Photos;
