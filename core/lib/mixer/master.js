import MixerParser from './parsing.js';

import Mixplay from './mixplay.js';

export default {
    name: "Mixer",
    logo: "assets/logos/platforms/Mixer.png",
    icon: "assets/icons/platforms/Mixer.png",
    baseUrlMatch: MixerParser.isMixer,
    clients: {
        Mixplay
    }
};