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
        logo: "https://arlo.site/projects/community/logos/Spotimo v2.png",
        icon: "https://arlo.site/projects/community/logos/icons/Spotimo v2.png",
        color: "#FF4500"
    },
    name: "Spotimo",
    parseUrl: getProtocolFromUrl
}