import React from 'react';
import { Customizer, Stack, Text, DefaultButton, BaseButton, Button, CompoundButton, Panel, PanelType } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { PlatformSelector, IPlatformSelectorProps } from './settings/PlatformSelector';
import libs from '../../../core/libs';
import { ILib, IPlatform } from '../../../core/typings';

export interface ISettingsView {
    backgroundColor: string;
}

enum SettingSubmenu {
    Platform
};

let CurrentView: SettingSubmenu | undefined;

export interface ISettingsState {
    showPanel: boolean;
    panelTitle: string;
}

function GetPlatforms(): IPlatform[] {
    let platforms: IPlatform[] = [];

    for (const [index, [key, value]] of Object.entries(Object.entries(libs.platforms))) {
        platforms.push(value);
    }

    return platforms;
}

export class SettingsView extends React.Component<ISettingsView, ISettingsState> {
    constructor(props: ISettingsView) {
        super(props);
        this.state = {
            showPanel: false,
            panelTitle: ""
        };

        this._ChangePlatformPreferences = this._ChangePlatformPreferences.bind(this);
    }

    private _hidePanel() {

    }
    private _ChangePlatformPreferences(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button, MouseEvent>) {
        CurrentView = SettingSubmenu.Platform;

        this.setState({
            showPanel: true,
            panelTitle: "Platforms"
        });
    }

    render() {
        return (
            <Stack
                styles={{
                    root: {
                        margin: '0 auto',
                        textAlign: 'center',
                        backgroundColor: this.props.backgroundColor
                    }
                }}>
                <Stack verticalAlign="start" gap={15}>
                    <CompoundButton onClick={this._ChangePlatformPreferences} iconProps={{ iconName: "StoreLogoMed20" }} primary secondaryText="Change preferences for another Platform">
                        Platforms
                     </CompoundButton>

                    <Panel
                        styles={{
                            navigation: {
                                position: "absolute",
                                width: "100vw"
                            },
                            header: {
                                marginTop: "10px"
                            }
                        }}
                        isOpen={this.state.showPanel}
                        type={PanelType.smallFluid}
                        onDismiss={this._hidePanel}
                        headerText={this.state.panelTitle}>
                        {
                            (() => {
                                if (CurrentView != undefined) {
                                    switch (+CurrentView) {
                                        case SettingSubmenu.Platform:
                                            return <PlatformSelector items={GetPlatforms()} />;
                                        default:
                                            throw new Error("Invalid view when rendering title");
                                    }
                                }
                            })()
                        }
                    </Panel>

                </Stack>
            </Stack>
        )
    }
};