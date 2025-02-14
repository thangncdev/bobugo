import React, { memo } from 'react';
import { TouchableOpacity as OriginalTouchableOpacity, TouchableOpacityProps } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface Props extends TouchableOpacityProps {
    shouldHaptic?: boolean;
    onPress?: () => void;
}

const TouchableOpacity = (props: Props) => {
    const handlePress = () => {
        if (props?.shouldHaptic) {
            ReactNativeHapticFeedback.trigger('impactLight');
        }
        if (props.onPress) {
            props.onPress();
        }
    }

    return (
        <OriginalTouchableOpacity {...props} onPress={handlePress} />
    )
};

export default memo(TouchableOpacity);
