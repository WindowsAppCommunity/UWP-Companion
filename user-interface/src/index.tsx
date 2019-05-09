import React from 'react';
import ReactDOM from 'react-dom';
import { mergeStyles } from '@uifabric/styling';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, Stack, Text, FontWeights, ISettings } from 'office-ui-fabric-react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";

initializeIcons(/* optional base url */);

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
      height: '100vh'
    }
  }
});

import logo from '../../assets/logos/popup.png';
import { IClient, IPlatform, IClientConfig, ILib } from '../../core/typings';
import libs, { checkLib } from '../../core/libs.js';

import { MainView } from './components/MainView';
import { SettingsView } from './components/SettingsView';
chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {

  ReactDOM.render(
    <Customizer {...FluentCustomizations}>
      <Router>
        <Stack
          styles={{
            root: {
              width: '320px',
              height: '300px;',
              margin: '0',
              paddingBottom: "20px",
              textAlign: 'center',
              backgroundColor: backgroundColor
            }
          }}>
          <Link to="/settings" style={{
            position: "absolute", right: "10px", top: "25px", color: "black"
          }}>
            <FontAwesomeIcon className="settings-cog" icon={faCog} style={{ fontSize: 23 }} />
          </Link>

          <Text variant="xxLarge" styles={boldStyle}>
            <Image src={logo} alt="logo" />
            UWP Companion
          </Text>

          {/* TODO Route to MainView and figure out how to pass in backgroundColor and the URL */}
          <Route path="/" render={(props) => <MainView url={(tab[0].url)} backgroundColor={backgroundColor} />} />
          <Route path="/settings" components={SettingsView} />
        </Stack>
      </Router>
    </Customizer>,
    document.getElementById('app')
  );
});