import { StyleSheet, View } from 'react-native';

import Header from 'components/header/Header';
import { useSetting } from 'contexts/SettingProvider';
import General from 'modules/settings/views/components/General';
import Info from 'modules/settings/views/components/Info';
import VersionApp from 'modules/settings/views/components/VersionApp';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

const SettingsScreen = () => {
    const { t } = useSetting();

    const renderHeader = () => <Header showShadowBottom={true} title={t('settings')} />;

    const renderContent = () => (
        <View style={styles.body}>
            <General />
            <View style={styles.line} />
            <Info />
            <VersionApp />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    body: {
        flex: 1,
        paddingHorizontal: scales(36),

    },
    textGreen: {
        ...TextStyles.SubTitle2,
        color: Colors.color_199744,
        marginVertical: scales(16),

    },
    textBlack: {
        ...TextStyles.SubTitle2,
        color: Colors.color_090F24,
        marginLeft: scales(8),
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
});
