import SpotifyParsers from './parsing.js';

import Spotimo from './spotimo.js';
import XpoMusic from './xpo-music.js';

export default {
    name: "Spotify",
    baseUrlMatch: SpotifyParsers.isSpotify,
    clients: {
        Spotimo, XpoMusic
    }
};