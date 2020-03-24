import MSSParser from './parsing.js';

import MSStore from './store.js'

export default {
    name: "Microsoft Store",
    baseUrlMatch: MSSParser.isStore,
    clients: {
        MSStore
    }
};
