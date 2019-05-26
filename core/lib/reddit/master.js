import RedditParser from './parsing.js';

import Legere from './legere.js';
import Reddplanet from './reddplanet.js';

export default {
    name: "Reddit",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Reddit.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Reddit.png",
    baseUrlMatch: RedditParser.isReddit,
    clients: {
        Legere,
        Reddplanet
    }
};