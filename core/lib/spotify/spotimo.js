export default {
    config: {
        logo: "https://arlo.site/projects/community/logos/Spotimo v2.png",
        color: "#FF4500"
    },
    name: "Spotimo",
    parseUrl: function(url) {
        // Other logic to return different protocol URLs
        return "spotify:" + url;
    }
}