function getProtocolFromUrl(url, tabId) {
    let match = url.match(/^http.*discordapp\..[a-z]{0,4}?(?=\/channels)(.+)/);
    if (match && match[1]) {
        console.log(match, "quarrel:/" + match[1]);
        return "quarrel:/" + match[1];
    }
    return;
}

export default {
    name: "Quarrel",
    parseUrl: getProtocolFromUrl,
    config: {
        logo: "https://arlo.site/projects/community/logos/Quarrel.png",
        color: "#7289DA"
    }
};
