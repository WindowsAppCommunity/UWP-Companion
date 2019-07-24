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
        color: "#1ED760",
        appProtocol: "spotimo"
    },
    name: "Spotimo",
    parseUrl: getProtocolFromUrl
}