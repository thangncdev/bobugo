import React, { useEffect } from 'react';
import { BackHandler, Image, ImageURISource, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import Button from 'components/button/Button';
import GradientButton from 'components/button/GradientButton';
import { DialogType } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';

export interface DialogProps {
    type?: DialogType;
    icon: ImageURISource;
    title: string;
    textButtonClose?: string;
    textButtonConfirm?: string;
    onConfirm?: () => void;
    onClose?: () => void;
    renderContent?: React.ReactElement;
    titleStyle?: StyleProp<TextStyle>;
    withoutHideKB?: boolean;
}

const Dialog = (props: DialogProps) => {
    const { t } = useSetting();

    const { type = DialogType.ONE, icon, title, textButtonClose, textButtonConfirm,
        onClose, onConfirm, renderContent, titleStyle } = props;

    useEffect(() => {
        const backAction = () => {
            onClose()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    const renderIcon = () => {
        if (icon) {
            return (
                <View style={styles.iconContainer}>
                    <Image source={icon} style={styles.icon} />
                </View>
            );
        }
    };

    const renderTitle = () => title ? (
        <Text style={[styles.title, titleStyle]}>
            {title}
        </Text>
    ) : null;

    const renderButton = () => {
        switch (type) {
            case DialogType.TWO:
                return (
                    <View style={styles.viewButton}>
                        {renderButtonConfirm()}
                        {renderButtonClose()}
                    </View>
                );
            case DialogType.ONE:
            default:
                return (
                    <View style={styles.viewButton}>
                        {renderButtonConfirm()}
                    </View>
                );
        }
    };

    const renderButtonClose = () => (
        <Button
            title={textButtonClose || t('no')}
            customStyles={styles.buttonClose}
            customTextStyles={styles.buttonTextClose}
            onPress={onClose}
        />
    );

    const renderButtonConfirm = () => (
        <GradientButton
            customStylesContainer={styles.button}
            title={textButtonConfirm || t('yes')}
            customStyles={styles.button}
            customTextStyles={styles.buttonText}
            onPress={onConfirm}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {renderIcon()}
                {renderTitle()}
                {renderContent}
                {renderButton()}
            </View>
        </View>
    );
};

export default Dialog;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginHorizontal: scales(55),
        backgroundColor: Colors.color_FFFFFF,
        padding: scales(24),
        borderRadius: scales(10),
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        paddingBottom: scales(18),
    },
    icon: {
        width: scales(50),
        height: scales(50),
    },
    title: {
        ...Fonts.w500,
        fontSize: scales(14),
        color: Colors.color_25282B,
        textAlign: 'center',
        paddingBottom: scales(18),
        paddingHorizontal: scales(10),
    },
    button: {
        flex: 1,
        borderRadius: scales(10),
    },
    buttonText: {
        color: Colors.color_FFFFFF,
    },
    buttonClose: {
        flex: 1,
        marginLeft: scales(15),
        borderRadius: scales(10),
        backgroundColor: Colors.color_5E626F,
    },
    buttonTextClose: {
        color: Colors.color_FFFFFF,
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: scales(40),
        justifyContent: 'space-between',
    },
});
