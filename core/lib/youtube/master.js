import myTube from './mytube.js';
import Youtubeast from './youtubeast.js'
import YTParser from './parsing.js';

export default {
    name: "YouTube",
    baseUrlMatch: YTParser.isYoutube,
    clients: {
        myTube,
        Youtubeast
    }
};
