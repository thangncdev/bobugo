import React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Sizes } from 'themes';

interface SkeletonProps {
    width?: number;
    height?: number;
    borderRadius?: number;
    backgroundColor?: string;
    highlightColor?: string;
    speed?: number;
}


const getColorType = (color: string) => {
    if (
        new RegExp(
            /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)$/,
        ).test(color)
    ) {
        return 'rgba';
    }
    if (
        new RegExp(
            /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/,
        ).test(color)
    ) {
        return 'rgb';
    }

    if (new RegExp(/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i).test(color)) {
        return 'hex';
    }

    // eslint-disable-next-line no-throw-literal
    throw `The provided color ${color} is not a valid (hex | rgb | rgba) color`;
};

const getTransparentColor = (color: string) => {
    const type = getColorType(color);

    if (type === 'hex') {
        if (color.length < 6) {
            return color.substring(0, 4) + '0';
        }
        return color.substring(0, 7) + '00';
    }
    // @ts-ignore
    const [r, g, b] = color.match(/\d+/g);
    return `rgba(${r},${g},${b},0)`;
};

const getGradientProps = () => ({
    start: {x: 0, y: 0},
    end: {x: 1, y: 0},
    style: {...StyleSheet.absoluteFillObject},
});

const Skeleton: React.FC<SkeletonProps> = (props) => {
    const { width = 100, height = 30, borderRadius = 0, backgroundColor = '#E1E9EE', highlightColor = '#F2F8FC', speed = 800 } = props;

    const animatedValueRef = React.useRef(new Animated.Value(0));

    React.useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(animatedValueRef.current, {
                toValue: 1,
                duration: speed,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        );
        loop.start();
        return () => loop.stop();
    }, [speed]);

    const transparentColor = React.useMemo(
        () => getTransparentColor(highlightColor.replace(/ /g, '')),
        [highlightColor],
    );

    const animatedGradientStyle = React.useMemo(() => {
        const animationWidth = Sizes.screenWidth;
        return {
            ...StyleSheet.absoluteFillObject,
            flexDirection: 'row' as const,
            transform: [
                {
                    translateX: animatedValueRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-animationWidth, animationWidth],
                    }),
                },
            ],
        };
    }, []);


    return (
        <View style={[styles.container, { width, height, borderRadius, backgroundColor }]}>
            <Animated.View style={animatedGradientStyle}>
                <LinearGradient
                    {...getGradientProps()}
                    colors={[transparentColor, highlightColor, transparentColor]}
                />
            </Animated.View>
        </View>
    )
}

export default Skeleton;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
