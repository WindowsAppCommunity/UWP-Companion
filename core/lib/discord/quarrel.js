function getProtocolFromUrl(url, tabId) {
    let match = url.match(/^http.*discordapp\..[a-z]{0,4}?(?=\/channels)(.+)/);
    if (match && match[1]) {
        console.log("Matched url \"" + url + "\", using protocol: ", "quarrel:/" + match[1]);
        return "quarrel:/" + match[1];
    }
    return;
}

export default {
    name: "Quarrel",
    parseUrl: getProtocolFromUrl,
    config: {
        logo: "https://arlo.site/projects/community/logos/Quarrel.png",
        icon: "https://arlo.site/projects/community/logos/icons/Quarrel.png",
        color: "#7289DA"
    }
};
