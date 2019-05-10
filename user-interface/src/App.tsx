import React from 'react';
import { Customizer, Stack, Text, FontWeights, ISettings, DefaultButton, Link } from 'office-ui-fabric-react';
import { GetPlatformNameFromUrl } from '../../core/helpers/misc.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { MainView } from './components/MainView';
import { SettingsView } from './components/SettingsView';

enum Views { SettingsView, MainView };
let CurrentView: Views = Views.MainView;

export interface IAppProps {
    backgroundColor: string;
    url?: string;
}

export class App extends React.Component<IAppProps, {}> {
    constructor(props: IAppProps) {
        super(props);
        this.ToggleSettings = this.ToggleSettings.bind(this);
    }
    private boldStyle = {
        root: {
            fontWeight: FontWeights.semibold,
            backgroundColor: this.props.backgroundColor
        }
    };
    private ToggleSettings(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        switch (CurrentView) {
            case 0:
                CurrentView = Views.MainView;
                break;
            case 1:
                CurrentView = Views.SettingsView;
                break;
            default:
                console.error("Invalid view: " + CurrentView, "Valid views are: " + JSON.stringify(Views));
        }
        this.forceUpdate();
    }
    render() {
        return (
            <Stack styles={{
                root: {
                    width: '320px',
                    height: '400px',
                    margin: '0px',
                    padding: '0px',
                    textAlign: 'center',
                    backgroundColor: this.props.backgroundColor
                }
            }}>
                <Link onClick={this.ToggleSettings} style={{
                    position: "absolute", right: "10px", top: "25px", color: "black"
                }}>
                    <div>
                        <FontAwesomeIcon className="settings-cog" icon={faCog} style={{ fontSize: 23 }} />
                    </div>
                </Link>

                <Text variant="xLarge" styles={this.boldStyle} style={{ marginBottom: "20px", marginTop: "20px" }}>
                    {(() => {
                        switch (+CurrentView) {
                            case Views.SettingsView:
                                return "Settings";
                            case Views.MainView:
                                return "UWP Companion"
                            default:
                                throw new Error("Invalid view when rendering title");
                        }
                    })()}
                </Text>

                {(() => {
                    switch (+CurrentView) {
                        case Views.SettingsView:
                            return <SettingsView backgroundColor={this.props.backgroundColor} />
                        case Views.MainView:
                            return <MainView url={this.props.url} backgroundColor={this.props.backgroundColor} />
                        default:
                            throw new Error("Invalid view when rendering view");
                    }
                })()}
            </Stack>
        )
    }
};
