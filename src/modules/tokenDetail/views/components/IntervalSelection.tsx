import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';


interface Props {
    width: number;
    height: number;
    intervals: masterdata.Interval[];
    interval: masterdata.Interval;
    setInterval: (interval: masterdata.Interval) => void;
}

type CoinsSelectionProps = Props;

const IntervalsSelection: React.FC<CoinsSelectionProps> = (props) => {
    const { width, height, intervals, interval, setInterval } = props;

    const onSelect = (_interval: masterdata.Interval) => {
        setInterval(_interval);
        DialogUtil.dismiss();
    };

    return (
        <View>
            {intervals.map(_interval => {
                const isSelected = interval.key === _interval.key;
                return (
                    <TouchableOpacity
                        key={_interval.key}
                        onPress={() => onSelect(_interval)}
                        style={[styles.button, { width, height }]}
                    >
                        <Text style={[styles.text, isSelected ? { color: Colors.color_199744 } : {}]}>
                            {_interval?.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
};

export default IntervalsSelection;

const styles = StyleSheet.create({
    button: {
        marginBottom: scales(0.5),
        backgroundColor: Colors.color_090F24,
        borderRadius: scales(4),
        paddingHorizontal: scales(4),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: scales(24),
    },
    text: {
        color: Colors.color_E9EAEC,
        ...Fonts.w500,
        fontSize: scales(16),
    },
});
