import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { AppState, Linking, Platform, StyleSheet, Switch, Text, View } from 'react-native';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import Header from 'components/header/Header';
import { useSetting } from 'contexts/SettingProvider';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

const AlertsSettingScreen = () => {
    const { t } = useSetting();
    const [enableNotification, setEnableNotification] = useState<boolean>(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', _ => {
            checkPermission().catch(); // check when app open after on/off notification in setting device
        });

        checkPermission().catch();

        return () => {
            subscription.remove();
        };
    }, []);


    const checkPermission = async () => {
        const enabled = await messaging().hasPermission();
        if (enabled === 1) {
            setEnableNotification(true);
        } else {
            setEnableNotification(false);
        }
    };

    const openSettings = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:').catch();
        } else {
            Linking.openSettings().catch();
        }
    };

    const renderHeader = () => <Header showShadowBottom={true} title={t('tabBar.alerts')} />;

    const renderShowNoti = () => (
        <View style={styles.row}>
            <Text style={styles.textBlack}>
                {t('show_notification')}
            </Text>
            <View style={styles.lineVetical} />
            <Switch onValueChange={(value) => {
                openSettings();
            }} value={enableNotification} />
        </View>
    );

    const renderConfigSound = () => (
        <TouchableOpacity style={styles.row}>
            <Text style={styles.textBlack}>
                {t('sound')}
            </Text>
            <Text style={styles.textGray}>
                {t('default')}
            </Text>
            <Svgs.IcArrowRight width={scales(16)} height={scales(16)} />
        </TouchableOpacity>
    );

    const renderContent = () => (
        <View style={styles.body}>
            {renderShowNoti()}
            {Platform.OS === 'android' && renderConfigSound()}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

export default AlertsSettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,

    },
    body: {
        flex: 1,
        paddingHorizontal: scales(36),
        marginVertical: scales(24),
    },
    textGreen: {
        ...TextStyles.SubTitle2,
        color: Colors.color_199744,
        marginVertical: scales(16),

    },
    textBlack: {
        ...TextStyles.SubTitle2,
        color: Colors.color_090F24,
        flex: 1,
    },
    textGray: {
        ...TextStyles.Body3,
        color: Colors.color_5E626F,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scales(16),
    },
    line: {
        height: scales(1),
        backgroundColor: Colors.color_5E626F,
    },
    lineVetical: {
        height: scales(24),
        width: scales(1),
        backgroundColor: Colors.color_A2A4AA,
        marginHorizontal: scales(8),
    },
});

