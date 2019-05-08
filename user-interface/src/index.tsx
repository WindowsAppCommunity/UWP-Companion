import React from 'react';
import ReactDOM from 'react-dom';
import { PlatformView } from './components/PlatformView';
import { mergeStyles } from '@uifabric/styling';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, Stack, Text, Link, FontWeights, ISettings, Icon } from 'office-ui-fabric-react';
import { Image } from 'office-ui-fabric-react/lib/Image';

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
import { setSettings, getSettings, settings } from '../../core/helpers/settings.js';
import { GetPlatformNameFromUrl } from '../../core/helpers/misc.js';

chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
  let platformName = GetPlatformNameFromUrl(tab[0].url);
  if (platformName != undefined) {
    let PrefferedClient = (settings as ISettings)[platformName].prefferedApp;
    let platform = (libs as unknown as ILib).platforms[platformName];

    ReactDOM.render(
      <Customizer {...FluentCustomizations}>
        <Stack
          styles={{
            root: {
              margin: '0 auto',
              textAlign: 'center',
              backgroundColor: backgroundColor
            }
          }}>
          <Text variant="xxLarge" styles={boldStyle}>
            <Image src={logo} alt="logo" />
            UWP Companion
        </Text>
          <PlatformView DefaultClient={platform.clients[PrefferedClient]} Platform={platform} />
        </Stack>
      </Customizer>,
      document.getElementById('app')
    );
  } else {
    ReactDOM.render(
      <Customizer {...FluentCustomizations} >
        <Stack
          styles={{
            root: {
              width: '300px',
              height: '300px;',
              margin: '0 auto',
              textAlign: 'center',
              backgroundColor: backgroundColor
            }
          }}>
          <Text variant="xxLarge" styles={boldStyle}>
            UWP Companion
            <Image src={logo} alt="logo" />
          </Text>
          <Stack verticalAlign="end" gap={15}>
            <Text style={{ fontSize: 55 }}>
              =(
            </Text>

            <Text variant="xLarge">
              Unsupported website
            </Text>

            <Text variant="smallPlus">Know of a compatible app?</Text>
            <Text variant="smallPlus"><Link>See how you can help</Link></Text>
          </Stack>
        </Stack>
      </Customizer>,
      document.getElementById('app')
    );
  }
});

