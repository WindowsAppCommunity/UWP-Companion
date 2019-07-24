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
        logo: "assets/logos/clients/Spotimo.png",
        icon: "assets/icons/clients/Spotimo.png",
        color: "#1ED760",
        appProtocol: "spotimo"
    },
    name: "Spotimo",
    parseUrl: getProtocolFromUrl
}