import SpotifyParser from './parsing.js';

function getProtocolFromUrl(url) {
    let protocol = "";

    if (SpotifyParser.hasAlbum(url) != null
        || SpotifyParser.hasArtist(url) != null
        || SpotifyParser.hasPlaylist(url) != null
        || SpotifyParser.hasShow(url) != null) {
            protocol = "strix:" + url;
    }
    return protocol;
}

export default {
    config: {
        color: "#8600c9",
        appProtocol: "strix"
    },
    name: "Strix Music",
    parseUrl: getProtocolFromUrl
}
