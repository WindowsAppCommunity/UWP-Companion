import { containsBlacklistedKeyword } from '../../helpers/misc.js';

let blacklistedUrlKeywords = ["/", "dashboard"];

function getProtocolFromUrl(url, tabId) {
    let match = url.match(/^http.*mixer\..[a-z]{0,4}?\/(.+)/);
    if (match && match[1]) {
        if (containsBlacklistedKeyword(match[1], blacklistedUrlKeywords)) return;
        console.log("Matched url \"" + url + "\", using protocol: ", "mixergo:" + match[1]);
        return "mixergo:" + match[1];
    }
    return;
}

export default {
    name: "Mixplay",
    parseUrl: getProtocolFromUrl,
    config: {
        color: "#1ABAF3"
    }
};
