import React from 'react';
import { Customizer, Stack, Text, DefaultButton, BaseButton, Button, CompoundButton } from 'office-ui-fabric-react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface ISettingsView {
    backgroundColor: string;
}


const theme: ITheme = createTheme({
    fonts: {
        medium: {
            fontFamily: 'Monaco, Menlo, Consolas',
            color: "black"
        }
    }
});

function ChangePlatformPreferences(event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button, MouseEvent>) {
    // Probably use an overlay with build in close for this
}

export class SettingsView extends React.Component<ISettingsView> {
    constructor(props: ISettingsView) {
        super(props);
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
                <Stack verticalAlign="center" gap={15}>
                    <CompoundButton iconProps={{ iconName: "StoreLogoMed20"}} primary secondaryText="Change preferences for another Platform">
                        Platforms
                     </CompoundButton>

                </Stack>
            </Stack>
        )
    }
};