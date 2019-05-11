export default {
    config: {
        logo: "https://arlo.site/projects/community/logos/Legere.png",
        color: "#FF4500"
    },
    name: "Legere",
    parseUrl: function(url) {
        // Other log to return different protocol URLs
        return "legere:" + url.split("http://").join("").split("https://").join("");
    }
}