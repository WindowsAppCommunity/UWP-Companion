// This is here to keep code neat in the future
import { YouTube } from './lib/youtube/master.js.js';

const platforms = {
    YouTube: YouTube
};

import { getSettings, setSettings, settings } from './helpers/settings.js.js';
import { AppsEnum } from './helpers/appAssociations.js.js';
import mytube from './lib/youtube/mytube.js.js';
import { GetPlatformNameFromUrl } from './helpers/misc.js.js';

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
                if (settings[platformName].closeOnSwitch && platformName[platformName].shouldCloseOnSwitch(uri) && protocol) {
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