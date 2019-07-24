import SpotifyParsers from './parsing.js';

import Spotimo from './spotimo.js';
import Xpotify from './xpotify.js';

export default {
    name: "Spotify",
    logo: "assets/logos/platforms/Spotify.png",
    icon: "assets/icons/platforms/Spotify.png",
    baseUrlMatch: SpotifyParsers.isSpotify,
    clients: {
        Spotimo, Xpotify
    }
};