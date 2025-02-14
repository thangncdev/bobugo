import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Images from 'assets/images';
import Button from 'components/button/Button';
import { useSetting } from 'contexts/SettingProvider';
import { navigate } from 'modules/navigation/src/utils';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

const SuccessBlur = () => {
    const { t } = useSetting();

    const [visible, setVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        global.showSuccess = show;
        global.hideSuccess = hide;
    }, []);

    const show = (_message: string) => {
        setVisible(true);
        setMessage(_message);
    };

    const hide = () => setVisible(false);

    const onClose = () => {
        navigate('Login');
        global.hideSuccess();
    }

    return visible ? (
        <View style={styles.container}>
            <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="white"
            />
            <View style={styles.content}>
                <Image source={Images.SUCCESS} style={styles.image} />
                <Text style={styles.text}>{message}</Text>
                <Button title={t('close')} onPress={onClose} customStyles={styles.button} />
            </View>
        </View>
    ) : null;
};

export default SuccessBlur;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    absolute: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        backgroundColor: Colors.color_FFFFFF,
        width: Sizes.screenWidth - scales(32),
        paddingVertical: scales(50),
        paddingHorizontal: scales(16),
        borderRadius: scales(30),
        alignItems: 'center',
    },
    image: {
        width: scales(100),
        height: scales(100),
    },
    text: {
        ...Fonts.w700,
        fontSize: scales(14),
        color: Colors.color_199744,
        paddingVertical: scales(16),
    },
    button: {
        backgroundColor: Colors.color_3F3A58,
        height: scales(54),
        width: Sizes.screenWidth - scales(64),
        borderRadius: scales(30),
    },
});
