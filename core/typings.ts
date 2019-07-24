/* Typings for core js files */

export interface IClient {
    parseUrl: Function;
    config: IClientConfig;
    name: string;
}

export interface IClientConfig {
    color?: string;
    appProtocol: string;
    // The icon displayed in the extension popup
    logo?: string;
    // The icon is displayed in the extension bar when the current website is supported 
    icon?: string;
    // Set to true to use the platform logo
    usePlatformLogo?: boolean;
}

export interface IPlatform {
    name: string,
    logo?: string,
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