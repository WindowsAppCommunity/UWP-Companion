import './misc.js';
import libs from '../libs.js';

export async function setSettings(Settings) {
    settings = Settings;
    chrome.storage.local.set({ settings: Settings });
}

// TODO: Preferred app should be set by the user, create a setup wizard

const defaultSettings = {
    platforms: {
        YouTube: {
            prefferedApp: "myTube",
            isEnabled: true,
            closeOnSwitch: false
        },
        Discord: {
            prefferedApp: "Quarrel",
            isEnabled: true,
            closeOnSwitch: false
        },
        Reddit: {
            prefferedApp: "Legere",
            isEnabled: true,
            closeOnSwitch: false
        },
        Mixer: {
            prefferedApp: "Mixplay",
            isEnabled: true,
            closeOnSwitch: false
        },
        Spotify: {
            prefferedApp: "Strix Music",
            isEnabled: true,
            closeOnSwitch: false
        },
        "Microsoft Store": {
            prefferedApp: "Windows Store",
            isEnabled: true,
            closeOnSwitch: true
        }
    }
};


export let settings = defaultSettings;

export function getSettings(cb) {
    chrome.storage.local.get(["settings"], result => {
        if (result.settings !== undefined) {
            // Check for new platforms that aren't present in stored settings 
            for (let key of Object.keys(defaultSettings.platforms)) {
                if (result.settings.platforms[key] === undefined) {

                    result.settings.platforms =
                        { ...result.settings.platforms, [key]: defaultSettings.platforms[key] }

                }
            }

            // Check for client names that have changed but old values are still stored in settings
            for (let key of Object.keys(result.settings.platforms)) {
                if (libs.platforms[key].clients[result.settings.platforms[key].prefferedApp] == undefined) {
                    // Restore to default app when the name of the preffered app changes
                    result.settings.platforms[key].prefferedApp = defaultSettings.platforms[key].prefferedApp;
                }
            }

            settings = result.settings;
            if (cb) cb(result.settings);
        } else {
            setSettings(defaultSettings);
            if (cb) cb(defaultSettings);
        }
    });
}
