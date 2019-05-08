/* Typings for core js files */

export interface IClient {
    ParseUrl: Function;
    config: IClientConfig;
}

export interface IClientConfig {
    color: string;
}

export interface IPlatform {
    baseUrlMatch: Function,
    shouldCloseOnSwitch: Function,
    clients?: IClient[];
    [key: string]: any;
}
