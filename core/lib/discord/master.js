import DiscordParser from './parsing.js';

import Quarrel from './quarrel.js';

export default {
    name: "Discord",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Discord.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Discord.png",
    baseUrlMatch: DiscordParser.isDiscord,
    clients: {
        Quarrel
    }
};