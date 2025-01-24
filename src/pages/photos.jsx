import "../styles/photos.css";
import { useState, useEffect } from "react";
import Loading from "../comps/loading.jsx";

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const importAll = (r) => r.keys().map(r);
        const images = importAll(require.context("../images", false, /\.(png|jpe?g|gif)$/));
        setPhotos(images);
        console.log(images);
        setLoading(false);
    }, []);

    return (
        <div id="photos">
            <h1>Photos</h1>
            <p>Here are some of my favorite space photos!</p>
            <div id="photo-container">
                {loading ? (
                    <Loading delay="point-five-seconds" />
                ) : (
                    photos.length > 0 ? (
                        <div id="photo-scroll">
                            {photos.map((photo, index) => (
                                <div className="photo-item" key={index}>
                                    <img
                                        src={photo}
                                        alt={`Photo ${index + 1}`}
                                        style={{
                                            pointerEvents: "none"
                                        }}
                                        onAnimationEnd={(e) => e.target.style.pointerEvents = "auto"}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No photos found!</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Photos;
