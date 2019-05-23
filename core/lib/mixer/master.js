import Mixplay from './mixplay.js';

const clients = {
    Mixplay: Mixplay
}

export default {
    name: "Mixer",
    logo: "https://github.com/mixer/branding-kit/raw/master/png/MixerLogo_Light.png",
    baseUrlMatch: function(url) {
        if (typeof url == 'string') {
            let match = url.match(/^http.*mixer\..[a-z]{0,4}?(?=\/)(.+)/);
            return (match && match[1]) ? true : false;
        } else console.error('Incorrect data recieved while checking domain');
    },
    clients: clients
};