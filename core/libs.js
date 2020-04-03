// This is here to keep code neat in the future
import YouTube from './lib/youtube/master.js';
import Reddit from './lib/reddit/master.js';
import Spotify from './lib/spotify/master.js';
import Discord from './lib/discord/master.js';
import Mixer from './lib/mixer/master.js';
import MicrosoftStore from './lib/mircosoftstore/master.js';

const platforms = {
    YouTube,
    Reddit,
    Spotify,
    Discord,
    Mixer,
    "Microsoft Store": MicrosoftStore
};

for (const [platform, platformData] of Object.entries(platforms)) {
    // Set platform logo and icon based on name, if not set
    if (!platformData.logo) platformData.logo = `../assets/logos/platforms/${platformData.name}.png`;
    if (!platformData.icon) platformData.icon = `../assets/icons/platforms/${platformData.name}.png`;

    // Set client logo and icons from name, if not set
    for (const [client, clientData] of Object.entries(platformData.clients)) {
        // Use the platform logos if specified
        if (clientData.config.usePlatformLogo === true) {
            if (!clientData.config.logo) clientData.config.logo = `../assets/logos/platforms/${platformData.name}.png`;
            if (!clientData.config.icon) clientData.config.icon = `../assets/icons/platforms/${platformData.name}.png`;
        } else {
            // Use client logos otherwise
            if (!clientData.config.logo) clientData.config.logo = `../assets/logos/clients/${clientData.name}.png`;
            if (!clientData.config.icon) clientData.config.icon = `../assets/icons/clients/${clientData.name}.png`;
        }
    }
}


import { settings } from './helpers/settings.js';

export function getPlatformName(uri, bypass) {
    let platformName;
    if (!uri) return;

    for (const name of Object.keys(platforms)) {
        if ((settings.platforms[name].isEnabled || bypass) && platforms[name].baseUrlMatch(uri)) {
            platformName = name;
        }
    }
    return platformName;
}

export function getPrefferedClient(platformName) {
    let client;

    Object.entries(platforms[platformName].clients).forEach(([clientName, clientData]) => {
        if (clientData.name == settings.platforms[platformName].prefferedApp) {
            client = clientData;
        }
    });

    return client;
}

export function getProtocolUri(uri, tabId, bypass) {
    let platformName = getPlatformName(uri, bypass);
    if (platformName == undefined) return;

    // perform URL parsing for that platform's preffered client
    let client = getPrefferedClient(platformName);

    let protocol = client.parseUrl(uri, tabId);

    return protocol;
}

export default {
    platforms
}