import { indexOf } from 'lodash';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { connect } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import HeaderMain from 'components/header/HeaderMain';
import { DialogType } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { alertActionCreators } from 'modules/alerts/src/action';
import { AlertsRoute } from 'modules/alerts/src/constants';
import { goToAddPriceAlerts } from 'modules/alerts/src/utils';
import AlertsScene from 'modules/alerts/views/AlertsScene';
import AlertsTabBar from 'modules/alerts/views/components/AlertsTabBar';
import { profileInfoSelector } from 'modules/user/src/selectors';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from 'themes';
import scales from 'utils/scales';
interface StateProps {
    profile: user.Profile;
}

interface DispatchProps {
    deleteAlerts: typeof alertActionCreators.deleteAlerts;
    sendMailSupportAlert: typeof alertActionCreators.sendMailSupportAlert;
}

type AlertsScreenProps = StateProps & DispatchProps;
const AlertsScreen = (props: AlertsScreenProps) => {
    const { t } = useSetting();
    const layout = useWindowDimensions();

    const { profile, deleteAlerts, sendMailSupportAlert } = props;

    const [index, setIndex] = useState<number>(0);
    const [listItem, setListItem] = useState<alerts.ListItemByRoute>({
        0: { total: 0, all: [], ids: [] },
        1: { total: 0, all: [], ids: [] },
    });

    const isTokenRoute = useMemo(() => index === 0, [index]);

    const renderHeader = () => <HeaderMain right={rightHeader()} />;

    const rightHeader = () => {
        const isEnableDeleteBtn = listItem[index]?.ids?.length;

        return (
            <View style={styles.rightHeader}>
                <TouchableOpacity onPress={goToAddPriceAlertsValid}>
                    <Svgs.IcSearch width={scales(24)} height={scales(24)} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!isEnableDeleteBtn} style={styles.btnDelete} onPress={showDialogDeleteAll}>
                    <Svgs.IcTrash
                        width={scales(24)}
                        height={scales(24)}
                        color={isEnableDeleteBtn ? Colors.color_000000 : Colors.color_A2A4AA}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const showDialogDeleteAll = () => {
        DialogUtil.showMessageDialog({
            type: DialogType.TWO,
            icon: Images.RED_QUESTION,
            title: t('want_delete_alert'),
            onConfirm: handleDeleteAlerts,
        }).catch();
    };

    const handleDeleteAlerts = () => {
        DialogUtil.dismiss();
        const payload: alerts.AlertsActionPayload = {
            index,
            ids: listItem[index].ids,
        };
        deleteAlerts(payload);
    };

    const renderScene = ({ route }) => (
        <AlertsScene
            index={indexOf(
                AlertsRoute,
                AlertsRoute.find((_route) => _route.key === route.key)
            )}
            listItem={listItem}
            setListItem={setListItem}
        />
    );

    const renderTabs = (propsTab) => (
        <AlertsTabBar {...propsTab} listItem={listItem} setListItem={setListItem} index={index} setIndex={setIndex} />
    );

    const renderContent = () => (
        <TabView
            lazy
            swipeEnabled={false}
            navigationState={{ index, routes: AlertsRoute }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabs}
        />
    );

    const renderButtonAlerts = () => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={goToAddPriceAlertsValid}
            style={styles.touchableContainer}
        >
            <LinearGradient
                colors={[Colors.color_4FE54D, Colors.color_1CB21A]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0.36, 0.96]}
                style={styles.btnAlerts}
            >
                <Svgs.IcAdd width={scales(24)} height={scales(24)} color={Colors.color_FFFFFF} />
                <Text style={styles.textAlerts}>{t('tabBar.alerts')}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    const goToAddPriceAlertsValid = () => {
        console.log('validateLimit', validateLimit());
        if (validateLimit()) {
            goToAddPriceAlerts(isTokenRoute);
        } else {
            showDialogLimit();
        }
    };

    const validateLimit = () => {
        if (isTokenRoute) {
            return profile?.limit_alert_token > listItem[0].total;
        } else {
            return profile?.limit_alert_nft > listItem[1].total;
        }
    };

    const showDialogLimit = () => {
        DialogUtil.showMessageDialog({
            title: t('you_have_reached_alerts'),
            onConfirm: onSendMailSupport,
            textButtonConfirm: t('send'),
            icon: Images.WARNING,
        }).catch();
    };

    const onSendMailSupport = () => {
        DialogUtil.dismiss();
        sendMailSupportAlert(index);
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
            {renderButtonAlerts()}
        </View>
    );
};

const mapState = (state: GlobalState) => ({
    profile: profileInfoSelector(state),
});

const mapDispatch = {
    deleteAlerts: alertActionCreators.deleteAlerts,
    sendMailSupportAlert: alertActionCreators.sendMailSupportAlert,
};

export default connect(mapState, mapDispatch)(AlertsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.color_FFFFFF,
    },
    touchableContainer: {
        position: 'absolute',
        bottom: scales(28),
        right: scales(32),
        zIndex: 1,
    },
    btnAlerts: {
        flexDirection: 'row',
        backgroundColor: Colors.color_199744,
        paddingHorizontal: scales(24),
        paddingVertical: scales(8),
        borderRadius: scales(5),
        alignItems: 'center',
    },
    textAlerts: {
        fontSize: scales(14),
        ...Fonts.w500,
        color: Colors.color_FFFFFF,
        marginLeft: scales(8),
    },
    rightHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnDelete: {
        marginLeft: scales(16),
    },
});
