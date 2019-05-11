import './misc.js';

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
            prefferedApp: "Spotimo",
            isEnabled: true,
            closeOnSwitch: false
        }
    }
};


export let settings = defaultSettings;

export function getSettings(cb) {
    chrome.storage.local.get(["settings"], result => {
        if (result.settings !== undefined) {

            // Check for new platforms that aren't present in stored settings 
            for (let name of Object.keys(defaultSettings.platforms)) {
                if (result.settings.platforms[name] === undefined) {
                    result.settings.platforms[name] == defaultSettings.platforms[name];
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
