import DiscordParser from './parsing.js';

import Quarrel from './quarrel.js';

export default {
    name: "Discord",
    baseUrlMatch: DiscordParser.isDiscord,
    clients: {
        Quarrel
    }
};