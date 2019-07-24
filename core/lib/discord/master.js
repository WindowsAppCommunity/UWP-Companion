import DiscordParser from './parsing.js';

import Quarrel from './quarrel.js';

export default {
    name: "Discord",
    logo: "assets/logos/platforms/Discord.png",
    icon: "assets/icons/platforms/Discord.png",
    baseUrlMatch: DiscordParser.isDiscord,
    clients: {
        Quarrel
    }
};