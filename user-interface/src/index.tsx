import React from 'react';
import ReactDOM from 'react-dom';
import { mergeStyles } from '@uifabric/styling';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, Stack, Text, FontWeights, Link } from 'office-ui-fabric-react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export let backgroundColor: string = "#f3f2f1";

const boldStyle = {
  root: {
    fontWeight: FontWeights.semibold,
    backgroundColor: backgroundColor
  }
};

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh',
      backgroundColor: backgroundColor
    }
  }
});

import logo from '../../assets/logos/popup.png';

import { MainView } from './components/MainView';
import { SettingsView } from './components/SettingsView';

function ToggleSettings(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
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
  render();
}

enum Views { SettingsView, MainView };
let CurrentView: Views = Views.MainView;

function render() {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
    ReactDOM.render(
      <Customizer {...FluentCustomizations} >
        <Stack styles={{
        root: {
          width: '320px',
          height: '300px;',
          margin: '0',
          paddingBottom: "20px",
          textAlign: 'center',
          backgroundColor: backgroundColor
        }
      }}>
          <Link onClick={ToggleSettings} style={{
            position: "absolute", right: "10px", top: "25px", color: "black"
          }}>
            <div>
              <FontAwesomeIcon className="settings-cog" icon={faCog} style={{ fontSize: 23 }} />
            </div>
          </Link>

          <Text variant="xxLarge" styles={boldStyle}>
            <Image src={logo} alt="logo" />
            UWP Companion
          </Text>

          {(() => {
            switch (+CurrentView) {
              case Views.SettingsView:
                return <SettingsView backgroundColor={backgroundColor} />
              case Views.MainView:
                return <MainView url={tab[0].url} backgroundColor={backgroundColor} />
              default:
                throw new Error("Invalid view when rendering");
            }
          })()}
        </Stack>
      </Customizer>,
      document.getElementById('app')
    );
  });
}

render();