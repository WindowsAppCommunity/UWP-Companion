import MixerParser from './parsing.js';

import Mixplay from './mixplay.js';

export default {
    name: "Mixer",
    baseUrlMatch: MixerParser.isMixer,
    clients: {
        Mixplay
    }
};