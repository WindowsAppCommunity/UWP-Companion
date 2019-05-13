import { settings } from '../../helpers/settings.js';
import DiscordParsers from './parsing.js';

function urlToProtocolRaw(url) {
   
}

function getProtocolFromUrl(url, tabId) {
    return urlToProtocolRaw(url);
}

export default {
    name: "Quarrel",
    parseUrl: getProtocolFromUrl,
    config: {
        logo: "https://store-images.s-microsoft.com/image/apps.62306.13577602785355884.0e67b9b6-743f-4e46-ab05-984c265bc2f6.7b319fca-f512-489a-be51-78388ba9b846?mode=scale&q=90&h=500&w=500",
        color: "#7289DA"
    }
};