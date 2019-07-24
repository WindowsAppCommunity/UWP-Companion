import RedditParser from './parsing.js';

import Legere from './legere.js';
import Reddplanet from './reddplanet.js';

export default {
    name: "Reddit",
    baseUrlMatch: RedditParser.isReddit,
    clients: {
        Legere,
        Reddplanet
    }
};