import './misc.js';
import { AppsEnum } from './appAssociations.js';

export async function setSettings(Settings) {
    settings = Settings;
    chrome.storage.local.set({ settings: Settings });
}

// TODO: Preferred app should be set by the user

const defaultSettings = {
    platforms: {
        YouTube: {
            prefferedApp: AppsEnum.YouTube.myTube,
            isEnabled: true,
            closeOnSwitch: false
        },
        Discord: {
            prefferedApp: AppsEnum.Discord.Quarrel,
            isEnabled: true,
            closeOnSwitch: false
        },
        Reddit: {
            prefferedApp: AppsEnum.Reddit.Legere,
            isEnabled: true,
            closeOnSwitch: false
        },
        Mixer: {
            prefferedApp: AppsEnum.Mixer.Mixplay,
            isEnabled: true,
            closeOnSwitch: false
        },
        Spotify: {
            prefferedApp: AppsEnum.Spotify.Spotimo,
            isEnabled: true,
            closeOnSwitch: false
        }
    }
};


export let settings = defaultSettings;

// TODO: Every time a new platform is added above, chrome.storage.local.clear() needs to be called or you get nullrefs
export function getSettings(cb) {
    chrome.storage.local.get(["settings"], result => {
        if (result.settings !== undefined) {
            settings = result.settings;
            if (cb) cb(result.settings);
        } else {
            setSettings(defaultSettings);
            if (cb) cb(defaultSettings);
        }
    });
}
