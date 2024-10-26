// src/api.js
export const fetchCurrentSong = async () => {
    try {
        const response = await fetch('/.netlify/functions/getCurrentSong');
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch current song:', error);
        throw error; // Rethrow the error for handling in the component
    }
};
