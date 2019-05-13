import { platform } from 'os';

/* Typings for core js files */

export interface IClient {
    parseUrl: Function;
    config: IClientConfig;
    name: string;
}

export interface IClientConfig {
    color: string;
    // Technically a logo is not "required" as it will fall back to the platform logo, but it is HIGHLY RECOMMENDED that you add one
    logo?: string;
}

export interface IPlatform {
    name: string,
    icon: string,
    baseUrlMatch: Function,
    shouldCloseOnSwitch?: Function,
    clients: {
        [key: string]: IClient;
    }
    // Additional general helper methods for the platform
    [key: string]: any;
}

export interface IPlatforms {
    [key: string]: IPlatform
}
export interface ILib {
    platforms: IPlatforms;
}

export interface ISettings {
    theme?: IThemeSetting,
    platforms: IPlatformSettings
    
}

export interface IPlatformSettings {
    [key: string]: IPlatformSetting;
}

export interface IPlatformSetting {
    prefferedApp: string,
    isEnabled: boolean,
    closeOnSwitch: boolean
}

export interface IThemeSetting {
    mode: "dark" | "light";
}