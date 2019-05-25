import Spotimo from './spotimo.js';

let clients = {
    Spotimo
};

export function isSpotify(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.?:\/\/(?:www\.)?(open.spotify\.[a-z]{0,4})/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}

export const Spotify = {
    name: "Spotify",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Spotify.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Spotify.png",
    baseUrlMatch: isSpotify,
    clients: clients
};