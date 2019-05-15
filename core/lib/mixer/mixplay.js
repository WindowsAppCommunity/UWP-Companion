let blacklistedUrlKeywords = ["/", "dashboard"];

function getProtocolFromUrl(url, tabId) {
    let match = url.match(/^http.*mixer\..[a-z]{0,4}?\/(.+)/);
    if (match && match[1]) {
        if (containsBlacklistedKeyword(match[1], blacklistedUrlKeywords)) return;
        console.log(url, "mixergo:" + match[1]);
        return "mixergo:" + match[1];
    }
    return;
}

function containsBlacklistedKeyword(toCheck, blacklist) {
    for (const keyword of blacklist) {
        if (toCheck.includes(keyword)) {
            console.log("found blacklisted keyword: " + keyword);
            return true;
        }
    }
    return false;
}

export default {
    name: "Mixplay",
    parseUrl: getProtocolFromUrl,
    config: {
        color: "#1ABAF3"
    }
};
