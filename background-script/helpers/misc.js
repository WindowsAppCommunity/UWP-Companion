import libs from '../libs.js';
import { settings } from './settings.js';

export function GetPlatformNameFromUrl(uri) {
    let name;
    for (const platformName of Object.keys(libs.platforms)) {
        if (libs.platforms[platformName].baseUrlMatch(uri)) {
            name = platformName;
        }
    }
    return name;
}


export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};