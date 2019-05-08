import React from 'react';
import ReactDOM from 'react-dom';
import { PlatformViewer } from './components/PlatformViewer';
import { mergeStyles } from '@uifabric/styling';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';
import { Image } from 'office-ui-fabric-react/lib/Image';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

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
import { IClient } from '../../core/typings';

ReactDOM.render(
  <Customizer {...FluentCustomizations}>
    <Stack>
      <Image src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        UWP Companion
      </Text>
      <PlatformViewer  />
    </Stack>
  </Customizer>,
  document.getElementById('app')
);
