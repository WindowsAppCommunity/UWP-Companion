import React from 'react';
import ReactDOM from 'react-dom';
import { mergeStyles } from '@uifabric/styling';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, Stack, Text, FontWeights, Link } from 'office-ui-fabric-react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { App } from './App';
initializeIcons();

export let backgroundColor: string = "#f3f2f1";

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

function render() {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tab) {
    ReactDOM.render(
      <Customizer {...FluentCustomizations} >
        <App url={tab[0].url} backgroundColor={backgroundColor} />
      </Customizer>,
      document.getElementById('app')
    );
  });
}

render();