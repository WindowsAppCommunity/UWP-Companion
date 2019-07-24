import SpotifyParsers from './parsing.js';

import Spotimo from './spotimo.js';
import Xpotify from './xpotify.js';

export default {
    name: "Spotify",
    baseUrlMatch: SpotifyParsers.isSpotify,
    clients: {
        Spotimo, Xpotify
    }
};