import myTube from './mytube.js';
import YTParser from './parsing.js';

export default {
    name: "YouTube",
    logo: "assets/logos/platforms/YouTube.png",
    icon: "assets/icons/platforms/YouTube.png",
    baseUrlMatch: YTParser.isYoutube,
    clients: {
        myTube
    }
};
