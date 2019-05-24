// This is here to keep code neat in the future
import { YouTube } from './lib/youtube/master.js';
import { Reddit } from './lib/reddit/master.js';
import { Spotify } from './lib/spotify/master.js';
import { Discord } from './lib/discord/master.js';
import Mixer from './lib/mixer/master.js';

const platforms = {
    YouTube: YouTube,
    Reddit: Reddit,
    Spotify: Spotify,
    Discord: Discord,
    Mixer: Mixer
};

import { settings } from './helpers/settings.js';

export function getPlatformName(uri, bypass) {
    let platformName;

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
        if (clientName == settings.platforms[platformName].prefferedApp) {
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
    platforms: platforms
}