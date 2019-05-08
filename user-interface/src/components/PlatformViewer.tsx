import React from 'react';
import { Stack, Text, Link, FontWeights } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
import libs from '../../../core/libs.js';
import { settings } from '../../../core/helpers/settings.js';
import { IClient, IPlatform } from '../../../core/typings';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

const options: IDropdownOption[] = [
  { key: 'apple', text: 'Apple' },
  // dropdown entries go here
];

export class PlatformViewer extends React.Component<IPlatform, any> {
  constructor(props: IPlatform) {
    super(props);
  }

  render() {
    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={{
          root: {
            width: '300px',
            height: '500px;',
            margin: '0 auto',
            textAlign: 'center',
            color: ""
          }
        }}
        gap={15}>

        <Dropdown responsiveMode={ResponsiveMode.large} options={options} styles={dropdownStyles} />
      </Stack>
    );
  }
}