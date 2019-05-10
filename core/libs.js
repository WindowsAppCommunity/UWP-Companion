// This is here to keep code neat in the future
import { YouTube } from './lib/youtube/master.js';

const platforms = {
    YouTube: YouTube
};

import { settings } from './helpers/settings.js';

export function checkLib(uri, tabId, bypass) {
    let platformName;
    for (const name of Object.keys(platforms)) {
        if ((settings[name].isEnabled || bypass) && platforms[name].baseUrlMatch(uri)) {
            platformName = name;
        }
    }
    if (platformName == undefined) return;

    // perform URL parsing for that platform's preffered client
    let protocol;
    Object.entries(platforms[platformName].clients).forEach(([clientName, client]) => {
        if (clientName == settings[platformName].prefferedApp) {
            protocol = client.parseUrl(uri, tabId);
            setTimeout(() => {
                if (settings[platformName].closeOnSwitch && platforms[platformName].shouldCloseOnSwitch(uri) && protocol) {
                    chrome.tabs.remove(tabId);
                }
            }, 500);
        }
    });
    return protocol;
}

export default {
    platforms: platforms
}