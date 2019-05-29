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
        logo: "https://arlo.site/projects/UWPCompanion/logos/clients/Quarrel.png",
        icon: "https://arlo.site/projects/UWPCompanion/icons/clients/Quarrel.png",
        color: "#7289DA",
        packageFamilyName: "38062AvishaiDernis.QuarrelInsider_q72k3wbnqqnj6"
    }
};
