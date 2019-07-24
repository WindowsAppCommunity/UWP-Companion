import RedditParser from './parsing.js';

import Legere from './legere.js';
import Reddplanet from './reddplanet.js';

export default {
    name: "Reddit",
    logo: "assets/logos/platforms/Reddit.png",
    icon: "assets/icons/platforms/Reddit.png",
    baseUrlMatch: RedditParser.isReddit,
    clients: {
        Legere,
        Reddplanet
    }
};