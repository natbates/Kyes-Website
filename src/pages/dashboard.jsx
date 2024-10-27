import "../styles/dashboard.css";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Loading from "../comps/loading";
import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

const Dashboard = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(true);
    const [confirmation, setConfirmation] = useState('');

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.loading) {
            navigate("/login");
        }
    }, [auth.isAuthenticated, auth.loading, navigate]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoadingImages(true);
        try {
            const spacePhotosRef = ref(storage, 'space-photos/');
            const res = await listAll(spacePhotosRef);
            const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
            setImages(urls);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoadingImages(false);
        }
    };

    const handleUpload = async (e) => {
        const files = e.target.files; // Get all selected files
        if (files.length > 0) {
            const uploadPromises = []; // Array to hold upload promises
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const imageRef = ref(storage, `space-photos/${file.name}`);
                const uploadPromise = uploadBytes(imageRef, file)
                    .then(() => {
                        console.log("File uploaded:", file.name);
                        return `Uploaded ${file.name}`; // Return success message
                    })
                    .catch(error => {
                        console.error("Error uploading file:", error);
                        return `Error uploading ${file.name}`; // Return error message
                    });
                uploadPromises.push(uploadPromise); // Add the promise to the array
            }
            const results = await Promise.all(uploadPromises); // Wait for all uploads to complete
            setConfirmation(results.join(', ')); // Combine results into a single message
            fetchImages(); // Refresh the image list after upload
        }
    };

    const handleDelete = async (url) => {
        const imageRef = ref(storage, url); 
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (confirmDelete) {
            try {
                await deleteObject(imageRef);
                console.log("File deleted:", url);
                fetchImages(); 
                setConfirmation(`Deleted ${url}`); 
            } catch (error) {
                console.error("Error deleting file:", error);
                setConfirmation(`Error deleting ${url}`); 
            }
        }
    };

    if (auth.loading || loadingImages) {
        return <Loading />;
    }

    return (
        <div id="dashboard">
            <h1>Dashboard</h1>
            <p>Here is the site's interactive dashboard. Upload and remove images from the site's page.</p>
            <div id="upload-image-container">
                <h2>Upload an image</h2>
                <p>Use the file upload button below to upload your image to the site</p>
                <input
                    type="file"
                    id="photo-input"
                    multiple // Allow multiple files
                    onChange={handleUpload}
                />
                <button className="submit-button">Submit</button>
            </div>

            <div id="remove-image-container">
                <h2>Remove images</h2>
                <p>Scroll through the images and click the ones you wish to remove.</p>
                {loadingImages ? (
                    <Loading delay="one-five-seconds" />
                ) : images.length > 0 ? (
                    <div id="image-grid">
                        {images.map((url, index) => (
                            <div key={url} className="image-container">
                                <img
                                    src={url}
                                    alt={`Uploaded ${index + 1}`}
                                    className="uploaded-image"
                                />
                                <button className="delete-button" onClick={() => handleDelete(url)}>Delete</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images found!</p>
                )}
                {confirmation && <p>{confirmation}</p>}
            </div>
        </div>
    );
};

export default Dashboard;
