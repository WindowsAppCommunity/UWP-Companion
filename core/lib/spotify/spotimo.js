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
        color: "#FF4500",
        packageFamilyName: "59553ArloG.Spotimo_gzh7hvbrgycb4"
    },
    name: "Spotimo",
    parseUrl: getProtocolFromUrl
}