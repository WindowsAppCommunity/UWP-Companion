import { settings } from '../../helpers/settings.js';

function urlToProtocolRaw(url) {
    "discordapp\.[a-z]{1,4}?(?=\/)(.+)"
}

function getProtocolFromUrl(url, tabId) {
    let match = url.match(/^http.*discordapp\..[a-z]{0,4}?(?=\/)(.+)/);
    if (match && match[1]) {
        return "quarrel://" + match[1];
    }
    return;
}

export default {
    name: "Quarrel",
    parseUrl: getProtocolFromUrl,
    config: {
        logo: "https://store-images.s-microsoft.com/image/apps.62306.13577602785355884.0e67b9b6-743f-4e46-ab05-984c265bc2f6.7b319fca-f512-489a-be51-78388ba9b846?mode=scale&q=90&h=500&w=500",
        color: "#7289DA"
    }
};