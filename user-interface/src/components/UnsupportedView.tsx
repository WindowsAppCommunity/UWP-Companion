import { Stack, Text, Link } from 'office-ui-fabric-react';
import React from 'react';

export interface IUnsupportedView {
    backgroundColor: string;
}

export class UnsupportedView extends React.Component<IUnsupportedView> {
    constructor(props: IUnsupportedView) {
        super(props);
    }
    render() {
        return (
            <Stack verticalAlign="center"
                styles={{
                    root: {
                        margin: '0 auto',
                        height: '300px',
                        textAlign: 'center',
                        backgroundColor: this.props.backgroundColor
                    }
                }}>
                <Stack verticalAlign="center" gap={15}>
                    <Text style={{ fontSize: 30 }}>
                        <p>
                            🤨
                        </p>
                    </Text>

                    <Text variant="xLarge">
                        Unsupported website
                    </Text>

                    <Text variant="smallPlus">Know of a compatible app?</Text>
                    <Text variant="smallPlus"><Link>See how you can help</Link></Text>
                </Stack>
            </Stack>
        )
    }
};