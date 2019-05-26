import MixerParser from './parsing.js';

import Mixplay from './mixplay.js';

export default {
    name: "Mixer",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Mixer.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Mixer.png",
    baseUrlMatch: MixerParser.isMixer,
    clients: {
        Mixplay
    }
};