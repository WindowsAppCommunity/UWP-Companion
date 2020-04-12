import MSSParser from './parsing.js';

export default {
    config: {
        color: "#0078D4",
        appProtocol: "ms-windows-store"
    },
    name: "Windows Store",
    parseUrl: function(url) {
        if (MSSParser.isApps(url)) {
            return "ms-windows-store://navigatetopage/?Id=Apps";
        }
        else if (MSSParser.hasApp(url) !== null) {
            console.info('App detected.');
            return `ms-windows-store://pdp/?ProductId=${MSSParser.hasApp(url)}`;
        }

        if (MSSParser.isHomepage(url)) {
            return "ms-windows-store:";
        }
    }
}