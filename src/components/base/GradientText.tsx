import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = (props) => (
    <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient
            colors={props.colors}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
        >
            <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
    </MaskedView>
);

export default GradientText;
