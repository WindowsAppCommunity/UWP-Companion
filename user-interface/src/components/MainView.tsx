import React, { SyntheticEvent } from 'react';
import { Stack } from 'office-ui-fabric-react';
import { PlatformView } from './PlatformView';
import { GetPlatformNameFromUrl } from '../../../core/helpers/misc.js';
import { UnsupportedView } from './UnsupportedView';
import { settings } from '../../../core/helpers/settings.js';
import { IPlatform, ILib, ISettings } from '../../../core/typings';
import libs from '../../../core/libs';

export interface IMainViewProps {
    backgroundColor: string;
    url?: string;
}

export interface IMainViewState {
    PrefferedClient: string | undefined;
    platform: IPlatform | undefined;
}

export class MainView extends React.Component<IMainViewProps, IMainViewState> {
    constructor(props: IMainViewProps) {
        super(props);
        let platformName: string | undefined = GetPlatformNameFromUrl(this.props.url);
        let PrefferedClient: string | undefined = platformName ? (settings as ISettings).platforms[platformName].prefferedApp : undefined;
        let platform: IPlatform | undefined = platformName ? (libs as unknown as ILib).platforms[platformName] : undefined;

        this.state = {
            platform: platform,
            PrefferedClient: PrefferedClient
        };
    }


    render() {
        return (
            <Stack
                styles={{
                    root: {
                        width: '300px',
                        margin: '15px auto',
                        textAlign: 'center',
                        backgroundColor: this.props.backgroundColor
                    }
                }}>
                {
                    this.state.platform != undefined && this.state.PrefferedClient != undefined
                        ? <PlatformView DefaultClient={this.state.platform.clients[this.state.PrefferedClient]} Platform={this.state.platform} />
                        : <UnsupportedView backgroundColor={this.props.backgroundColor} />
                }
            </Stack>
        )
    }
};
