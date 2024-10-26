const { getAccessToken } = require('./getNewToken');
const fetch = require('node-fetch');

exports.handler = async (event, context) => 
{
    console.log("Fetching current song...");

    const { access_token } = await getAccessToken();
    if (!access_token) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to obtain access token' }),
        };
    }

    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
            }
        });

        // Check if response status is 204 (No Content)
        if (response.status === 204) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({ message: 'No song is currently playing' }),
            };
        }

        if (!response.ok) {
            const errorBody = await response.text();
            return {
                statusCode: response.status,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({ error: 'Failed to fetch current song', details: errorBody })
            };
        }

        const songData = await response.json();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(songData),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
