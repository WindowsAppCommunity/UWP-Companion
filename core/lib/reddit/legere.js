import RedditParser from './parsing.js';

export default {
    config: {
        logo: "https://arlo.site/projects/UWPCompanion/logos/clients/Legere.png",
        icon: "https://arlo.site/projects/UWPCompanion/icons/clients/Legere.png",
        color: "#FF4500"
    },
    name: "Legere",
    parseUrl: function(url) {
        if (RedditParser.isSubreddit(url) || RedditParser.isUser(url) || RedditParser.isPost(url) || RedditParser.isMultireddit(url)) {
            return "legere://" + url.split("http://").join("").split("https://").join("");
        }
        return;
    }
}