import SpotifyParsers from './parsing.js';

import Strix from './strix.js';
import XpoMusic from './xpo-music.js';

export default {
    name: "Spotify",
    baseUrlMatch: SpotifyParsers.isSpotify,
    clients: {
        Strix, XpoMusic
    }
};