import React from 'react';
import { Stack, CompoundButton, Button, PrimaryButton, registerIconAlias } from 'office-ui-fabric-react';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import libs from '../../../core/libs.js';
import { settings, getSettings } from '../../../core/helpers/settings.js';
import { IPlatform, IClient, IClientConfig, ILib, ISettings, IPlatforms } from '../../../core/typings';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
getSettings();

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 280 }
};

const ClientsDropdown: IDropdownOption[] = [
  // dropdown entries go here
];

interface IPlatformState {
  Client: IClient;
}

interface IPlatformView {
  Platform: IPlatform;
  DefaultClient: string;
  OnClientChanged?: Function;
  OnLoaded?: Function;
  isSettingsView?: boolean;
}


function GetClientFromPlatform(clientName: string, platform: IPlatform): IClient | undefined {
  let returnClient: IClient | undefined;

  for (let client of Object.values(platform.clients)) {
    if (client.name == clientName) {
      returnClient = client;
    }
  }

  return returnClient;
}

function GetCurrentAppConfig(platform: string): IClientConfig {
  let prefferedApp: string = (settings as any)[platform].prefferedApp;
  return (libs as any).platforms[platform].clients[prefferedApp].config;
}

function GetCurrentPlatform(platformName: string): IPlatform {
  return (libs as any).platforms[platformName];
}

function GetDefaultClientForPlatform(platformName: string): IClient | undefined {
  let prefferedClient: string = (settings as any)[platformName].prefferedApp;
  return GetClientFromPlatform(prefferedClient, (libs as any).platforms[platformName]);
}

function PopulateClientsDropdown(platform: string, clear?: boolean): void {
  if (clear) {
    while (ClientsDropdown.length > 0) ClientsDropdown.shift();
  }

  for (let i of Object.values((libs as unknown as ILib).platforms[platform].clients)) {
    ClientsDropdown.push({
      text: i.name,
      key: i.name
    });
  }
}

function RelaySettingsState() {
  chrome.runtime.sendMessage({
    updateSettings: settings
  });
}

export class PlatformView extends React.Component<IPlatformView, IPlatformState> {
  constructor(props: IPlatformView, state: IPlatformState) {
    super(props);

    
    let client: IClient | undefined = GetClientFromPlatform(this.props.DefaultClient, this.props.Platform);

    console.log("client: ", client);
    if(!client) return;

    this.state = {
      Client: client
    };

    this.OnClientSelected = this.OnClientSelected.bind(this);
    this.LaunchClient = this.LaunchClient.bind(this);

    PopulateClientsDropdown(this.props.Platform.name, true);
  }

  componentDidMount() {
    if (this.props.OnLoaded != undefined) this.props.OnLoaded(this.props.DefaultClient);
  }

  OnClientSelected = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption | undefined, index?: number | undefined) => {
    if (option == undefined) return;

    let newClient: IClient | undefined = GetClientFromPlatform(option.text, this.props.Platform);
    if(!newClient) return;

    this.setState({
      Client: newClient
    });

    if (this.props.OnClientChanged != undefined) {
      this.props.OnClientChanged(newClient);
    }

    (settings as ISettings).platforms[this.props.Platform.name].prefferedApp = newClient.name;
    RelaySettingsState();

    if (!this.props.isSettingsView) {
      chrome.runtime.sendMessage({
        updateIcon: true
      });
    }
  };

  OnEnabledChanged = (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean | undefined) => {
    if (checked != undefined) (settings as ISettings).platforms[this.props.Platform.name].isEnabled = checked;
    RelaySettingsState();
  };

  OnCloseOnSwitchChanged = (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean | undefined) => {
    if (checked != undefined) (settings as ISettings).platforms[this.props.Platform.name].closeOnSwitch = checked;
    RelaySettingsState();
  };

  LaunchClient = () => {
    chrome.runtime.sendMessage({
      launch: true
    });
  };

  render() {
    return (
      <Stack
        horizontalAlign="start"
        verticalAlign="end"
        verticalFill
        gap={5}
        styles={{
          root: {
            margin: '0px 10px',
            textAlign: 'center'
          }
        }}>

        <Image
          styles={{
            root: {
              margin: "auto"
            }
          }}
          width={175}
          height={(this.props.isSettingsView == true ? 225 : 175)}
          imageFit={ImageFit.centerContain}
          src={this.state.Client.config.logo} />

        <PrimaryButton
          styles={{
            root: {
              margin: "auto"
            }
          }}

          onClick={this.LaunchClient} iconProps={{ iconName: "OpenInNewWindow" }} style={{
            height: "40px",
            width: "250px",
            margin: "10px",
            display: (this.props.isSettingsView == true ? "none" : "block")
          }}>
          Launch {this.state.Client.name}
        </PrimaryButton>

        <Toggle
          defaultChecked={(settings as ISettings).platforms[this.props.Platform.name].isEnabled}
          label={"Auto launch with " + this.state.Client.name}
          inlineLabel={true}
          onChange={this.OnEnabledChanged}
        />

        <Toggle
          defaultChecked={(settings as ISettings).platforms[this.props.Platform.name].closeOnSwitch}
          label="Close window on switch"
          styles={{
            container: {
              display: navigator.appVersion.includes('Edge') ? "none" : "unset"
            },
            label: {
              display: navigator.appVersion.includes('Edge') ? "none" : "unset"
            }
          }}
          inlineLabel={true}
          onChange={this.OnCloseOnSwitchChanged}
        />
        <Dropdown placeholder="Choose another app..." defaultSelectedKey={this.state.Client.name} responsiveMode={ResponsiveMode.large} options={ClientsDropdown} styles={dropdownStyles} onChange={this.OnClientSelected} />
      </Stack >
    );
  }
};