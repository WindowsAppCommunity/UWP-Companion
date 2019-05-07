import libs, { checkLib } from '../core/libs.js';
import { setSettings, getSettings, settings } from '../core/helpers/settings.js';
import { AppsEnum } from '../core/helpers/appAssociations.js';
import { GetPlatformNameFromUrl } from '../core/helpers/misc.js';


function openCurrentTab() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
        tab = tab[0];
        let protocol = checkLib(tab.url, tab.id, true);
        if (protocol) {
            chrome.tabs.update(tab.id, {
                url: protocol
            });
        }
    });
}

//#region Initialization
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('onoff').addEventListener('change', onEnableChanged);

    document.getElementById('closeTab').addEventListener('change', OnCloseTabChanged);

    document.getElementById('openIn').addEventListener('click', () => {
        openCurrentTab();
    });

    Init();
});
getSettings();
//#endregion

function onEnableChanged() {
    let isEnabled = document.getElementById('onoff').checked;
    settings[window.platform].isEnabled = isEnabled;

    RelaySettingsState(settings);
}
function OnCloseTabChanged() {
    let isCloseTabEnabled = document.getElementById('closeTab').checked;
    settings[window.platform].closeOnSwitch = isCloseTabEnabled;

    RelaySettingsState(settings);
}

function RelaySettingsState(settings) {
    chrome.runtime.sendMessage({
        updateSettings: settings
    });
}

function Init() {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
        let platform = GetPlatformNameFromUrl(tab[0].url);
        window.platform = platform;

        SetupPlatformIndicator(platform);
        SetupControls(platform);
        SetupTheme(platform);
    });
}

function SetupPlatformIndicator(platform) {
    let currentAppSettings = settings[platform];

    if (currentAppSettings != undefined) {
        document.getElementById("controls").style.display = "flex";
        document.querySelectorAll(".platformIndicator").forEach(element => {
            element.innerText = currentAppSettings.prefferedApp;
        });
    }
}

function GetCurrentAppConfig(platform) {
    let prefferedApp = settings[platform].prefferedApp;
    return libs.platforms[platform].clients[prefferedApp].config;
}

function SetupTheme(platform) {
    let appConfig = GetCurrentAppConfig(platform);
    if (appConfig == undefined) return;

    document.documentElement.style.setProperty("--primary-bg-colour", appConfig.color);
}

function SetupControls(platform) {
    PopulateAppOptions(platform);

    document.getElementById('onoff').checked = settings[platform].isEnabled;
    document.getElementById("closeTab").checked = settings[platform].closeOnSwitch;
}
function createOption(county, text, value) {
    
}
function PopulateAppOptions(platform) {
    const appSelector = document.getElementById("appSelector");
    for (const appName of Object.keys(libs.platforms[platform].clients)) {
        var opt = document.createElement('option');
        opt.value = appName;
        opt.text = appName;
        appSelector.options.add(opt);
    }
}