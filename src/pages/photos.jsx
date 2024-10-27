import "../styles/photos.css";
import { useEffect, useState } from "react";
import Loading from "../comps/loading.jsx";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; 

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [focusedIndex, setFocusedIndex] = useState(null);

    const fetchFirebasePhotos = async () => {
        try {
            const spacePhotosRef = ref(storage, 'space-photos/'); 
            const res = await listAll(spacePhotosRef); 

            const imagePromises = res.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return { name: item.name, url }; 
            });

            const images = await Promise.all(imagePromises); 
            setPhotos(images); 
        } catch (error) {
            console.error("Error fetching photos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFirebasePhotos();
    }, []);

    return (
        <div id="photos">
            <h1>Photos</h1>
            <p>Here are some of my favourite space photos!</p>
            <div id="photo-container">
                {loading ? (
                    <Loading delay="point-five-seconds" />
                ) : (
                    photos.length > 0 ? (
                        <div id="photo-scroll">
                            {photos.map((photo, index) => (
                                <div
                                    className={`photo-item ${focusedIndex !== index ? 'grayed-out' : ''}`}
                                    key={photo.name}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    onMouseLeave={() => setFocusedIndex(null)}
                                >
                                    <img
                                        src={photo.url} 
                                        alt={photo.name}
                                        style={{
                                            animationDelay: `${index * 0.1 + 0.5}s`,
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
