import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

import Svgs from 'assets/svgs';
import { useSetting } from 'contexts/SettingProvider';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

const VersionApp = () => {
    const { t } = useSetting();

    const [versionApp, setVersionApp] = useState<string>('');

    useEffect(() => {
        getVersion();
    }, []);

    const getVersion = () => {
        const version: string = DeviceInfo.getVersion();
        setVersionApp(version);
    }

    return (
        <View style={styles.container}>
            <Svgs.IcVersionApp width={scales(24)} height={scales(24)} />
            <View>
                <Text style={styles.textBlack}>{Config.APP_NAME}</Text>
                <Text style={styles.textGray}>{t('version')} {versionApp} </Text>
            </View>
        </View>
    )
}

export default VersionApp;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textBlack: {
        ...TextStyles.SubTitle2,
        color: Colors.color_090F24,
        marginLeft: scales(8),
    },
    textGray: {
        ...TextStyles.SubTitle2,
        color: Colors.color_A2A4AA,
        marginLeft: scales(8),
    },
})
