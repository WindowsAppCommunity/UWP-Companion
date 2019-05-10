import React from 'react';
import { Customizer, Stack, Text, FontWeights, ISettings, DefaultButton, Link } from 'office-ui-fabric-react';

export interface ISettingsView {
    backgroundColor: string;
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
                        width: '300px',
                        height: '300px;',
                        margin: '0 auto',
                        textAlign: 'center',
                        backgroundColor: this.props.backgroundColor
                    }
                }}>
                <Stack verticalAlign="center" gap={15}>
                    <Text style={{ fontSize: 55 }}>
                        Settings
                    </Text>

                    <Text variant="smallPlus">Know of a compatible app?</Text>
                    <Text variant="smallPlus"><Link>See how you can help</Link></Text>
                </Stack>
            </Stack>
        )
    }
};