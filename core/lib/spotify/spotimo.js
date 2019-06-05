import SpotifyParser from './parsing.js';

function getProtocolFromUrl(url) {
    let protocol = "";

    if (SpotifyParser.hasAlbum(url) != null
        || SpotifyParser.hasArtist(url) != null
        || SpotifyParser.hasPlaylist(url) != null) {
            protocol = "spotimo:" + url;
    }
    return protocol;
}

export default {
    config: {
        logo: "https://arlo.site/projects/UWPCompanion/logos/clients/Spotimo.png",
        icon: "https://arlo.site/projects/UWPCompanion/icons/clients/Spotimo.png",
        color: "#1ED760",
        appProtocol: "spotimo"
    },
    name: "Spotimo",
    parseUrl: getProtocolFromUrl
}