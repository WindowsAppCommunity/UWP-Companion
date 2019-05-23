import Legere from './legere.js';
import Reddplanet from './reddplanet.js';

let clients = {
    Legere: Legere,
    Reddplanet: Reddplanet
};

export function isReddit(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.?:\/\/(?:www\.)?(reddit\.[a-z]{0,4})/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}

export const Reddit = {
    name: "Reddit",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Reddit.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Reddit.png",
    baseUrlMatch: isReddit,
    clients: clients
};