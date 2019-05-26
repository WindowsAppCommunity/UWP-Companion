import myTube from './mytube.js';
import YTParser from './parsing.js';

export default {
    name: "YouTube",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/YouTube.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/YouTube.png",
    baseUrlMatch: YTParser.isYoutube,
    clients: {
        myTube
    }
};
