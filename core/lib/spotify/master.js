import Spotimo from './spotimo.js';

let clients = {
    Spotimo: Spotimo
};

export function isSpotify(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.?:\/\/(?:www\.)?(open.spotify\.[a-z]{0,4})/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}

export const Spotify = {
    name: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png",
    baseUrlMatch: isSpotify,
    clients: clients
};