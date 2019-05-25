import Mixplay from './mixplay.js';

const clients = {
    Mixplay
}

export default {
    name: "Mixer",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Mixer.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Mixer.png",
    baseUrlMatch: function(url) {
        if (typeof url == 'string') {
            let match = url.match(/^http.*mixer\..[a-z]{0,4}?(?=\/)(.+)/);
            return (match && match[1]) ? true : false;
        } else console.error('Incorrect data recieved while checking domain');
    },
    clients: clients
};