import myTube from './mytube.js';
import YTParser from './parsing.js';

export default {
    name: "YouTube",
    baseUrlMatch: YTParser.isYoutube,
    clients: {
        myTube
    }
};
