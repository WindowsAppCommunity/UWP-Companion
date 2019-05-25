import Quarrel from './quarrel.js';

let clients = {
    Quarrel
};

function shouldCloseOnSwitch(url) {
    // If the url isn't a discord url, don't close the tab
    return (isDiscord(url) ? true : false);
}

function isDiscord(url) {
    if (typeof url == 'string') {
        let match = url.match(/^http.*discordapp\..[a-z]{0,4}?(?=\/)(.+)/);
        return (match && match[1]) ? true : false;
    } else console.error('Incorrect data recieved while checking domain');
}
export const Discord = {
    name: "Discord",
    logo: "https://arlo.site/projects/UWPCompanion/logos/platforms/Discord.png",
    icon: "https://arlo.site/projects/UWPCompanion/icons/platforms/Discord.png",
    baseUrlMatch: isDiscord,
    shouldCloseOnSwitch: shouldCloseOnSwitch,
    clients: clients
};