import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect, useSelector } from 'react-redux';

import Images from 'assets/images';
import ButtonHorizontal from 'components/button/ButtonHorizontal';
import DialogUtil from 'components/dialog';
import Header from 'components/header/Header';
import { DialogType } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { navigate } from 'modules/navigation/src/utils';
import { userActionCreators } from 'modules/user/src/actions';
import { profileInfoSelector } from 'modules/user/src/selectors';
import { Colors, Sizes } from 'themes';
import scales from 'utils/scales';

interface ProfileDispatchProps {
    deleteProfile: typeof userActionCreators.deleteProfile;
    logout: typeof userActionCreators.logout;
}

type ProfileScreenProps = ProfileDispatchProps;

const ProfileScreen = (props: ProfileScreenProps) => {
    const { t } = useSetting();
    const profile = useSelector(profileInfoSelector);

    const { deleteProfile, logout } = props;

    const renderHeader = () => (
        <Header title={t('profile')} />
    );

    const renderEmail = () => (
        <ButtonHorizontal icon={'email'} title={profile?.email} />
    );

    const renderChangePassword = () => (
        <ButtonHorizontal
            onPress={goToChangePassword}
            icon={'reset'}
            title={t('change_password')}
        />
    );

    const renderDeleteProfile = () => (
        <ButtonHorizontal
            onPress={onDeleteProfile}
            icon={'deleteProfile'}
            title={t('delete_profile')}
        />
    );

    const onDeleteProfile = () => {
        DialogUtil.showMessageDialog({
            type: DialogType.TWO,
            icon: Images.RED_QUESTION,
            title: t('want_delete_proflie'),
            onConfirm: deleteProfile,
        }).catch();
    };

    const renderLogOut = () => (
        <ButtonHorizontal icon={'signOut'} title={t('sign_out')} onPress={logout} />
    );

    const renderBreakLine = () => <View style={styles.breakLine} />

    const renderContent = () => (
        <View style={styles.content}>
            {renderEmail()}
            {renderBreakLine()}
            {renderChangePassword()}
            {renderDeleteProfile()}
            {renderBreakLine()}
            {renderLogOut()}
        </View>
    );

    const goToChangePassword = () => navigate('ChangePassword');

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </View>
    );
};


const mapDispatchToProps = {
    deleteProfile: userActionCreators.deleteProfile,
    logout: userActionCreators.logout,
};

export default connect<undefined, ProfileDispatchProps>(
    undefined,
    mapDispatchToProps,
)(ProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: scales(12),
        paddingHorizontal: scales(32),
    },
    breakLine: {
        width: Sizes.screenWidth - scales(64),
        height: scales(1),
        backgroundColor: Colors.color_5E626F,
        marginVertical: scales(12),
    },
});
