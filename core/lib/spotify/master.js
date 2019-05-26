import Spotimo from './spotimo.js';
import Xpotify from './xpotify.js';

let clients = {
    Spotimo, Xpotify
};

export function isSpotify(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.?:\/\/(?:www\.)?(open.spotify\.[a-z]{0,4})/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}

export default {
    name: "Spotify",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Spotify.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Spotify.png",
    baseUrlMatch: isSpotify,
    clients: clients
};