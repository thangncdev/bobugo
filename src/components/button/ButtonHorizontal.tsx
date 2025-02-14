import { upperFirst } from 'lodash';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

interface ButtonHorizontalProps {
    icon: string;
    title: string;
    onPress?: () => void;
}

const ButtonHorizontal = (props: ButtonHorizontalProps) => {
    const { icon, title, onPress } = props;

    const SvgIcon = Svgs[`Ic${upperFirst(icon)}`];

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <SvgIcon width={scales(24)} height={scales(24)} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
};

export default ButtonHorizontal;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scales(48),
    },
    title: {
        ...Fonts.w500,
        fontSize: scales(16),
        color: Colors.color_090F24,
        paddingLeft: scales(8),
    },
});
