import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import Images from 'assets/images';
import Svgs from 'assets/svgs';
import { Image, TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { DialogType } from 'constants/constants';
import { useSetting } from 'contexts/SettingProvider';
import { TokensType } from 'modules/markets/src/constants';
import { goBack, navigate, pushToPage } from 'modules/navigation/src/utils';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import { isLoginSelector } from 'modules/user/src/selectors';
import { watchlistActionCreators } from 'modules/watchlists/src/actions';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface Props {
    token: tokenDetail.RouteParams;
    handleCaptureAndShare: () => void;
}

interface StateProps {
    isLogin: boolean;
}

interface DispatchProps {
    checkExistWatchlists: typeof watchlistActionCreators.checkExistWatchlists;
    addToWatchlists: typeof watchlistActionCreators.addToWatchlists;
    removeFromWatchlists: typeof watchlistActionCreators.removeFromWatchlists;
}

type HeaderTokenDetailProps = Props & StateProps & DispatchProps;

const HeaderTokenDetail = (props: HeaderTokenDetailProps) => {
    const { t } = useSetting();
    const { token, isLogin, handleCaptureAndShare,
        checkExistWatchlists, addToWatchlists, removeFromWatchlists,
    } = props;

    const [isWatchlist, setIsWatchlist] = useState<boolean>(false);

    useEffect(() => {
        checkExistWatchlists({ key: token.key, onSuccess: () => setIsWatchlist(true) });
    }, []);

    const goToMarketSearch = () => {
        const tokenType = isTokenKey(token.key) ? TokensType.TOKEN : TokensType.NFT
        pushToPage('MarketSearch', { tokenType })
    }

    const toggleWatchlist = () => {
        if (!isLogin) {
            DialogUtil.showMessageDialog({
                type: DialogType.TWO,
                icon: Images.WARNING,
                title: t('need_login'),
                onConfirm: () => goToLogin(),
            }).catch();
            return;
        }
        setIsWatchlist(prevState => !prevState);
        if (isWatchlist) {
            removeFromWatchlists({ key: token.key, onFailure });
        } else {
            addToWatchlists({ key: token.key, onFailure });
        }
    };

    const goToLogin = () => {
        DialogUtil.dismiss()
        navigate('Login');
    }

    const onFailure = () => {
        setIsWatchlist(prevState => !prevState);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack}>
                <Svgs.IcArrowLeft width={scales(24)} height={scales(24)} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Image uri={token?.logo} style={styles.image} />
                <Text style={styles.text} numberOfLines={1}>
                    {token?.name}
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={goToMarketSearch}>
                <Svgs.IcSearch2 width={scales(24)} height={scales(24)} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleWatchlist}>
                <Svgs.IcStar
                    width={scales(24)}
                    height={scales(24)}
                    color={isWatchlist ? Colors.color_FFCC00 : Colors.color_A2A4AA}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCaptureAndShare} style={styles.button}>
                <Svgs.IcShare width={scales(24)} height={scales(24)} color={Colors.color_090F24} />
            </TouchableOpacity>
        </View>
    );
};

const mapState = (state: GlobalState) => ({
    isLogin: isLoginSelector(state),
})

const mapDispatch = {
    checkExistWatchlists: watchlistActionCreators.checkExistWatchlists,
    addToWatchlists: watchlistActionCreators.addToWatchlists,
    removeFromWatchlists: watchlistActionCreators.removeFromWatchlists,
};

export default connect(mapState, mapDispatch)(HeaderTokenDetail);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Sizes.statusBarHeight + scales(44 + 18),
        paddingTop: Sizes.statusBarHeight,
        alignItems: 'center',
        paddingLeft: scales(35),
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: scales(24),
        marginRight: scales(8),
        alignItems: 'center',
    },
    image: {
        width: scales(24),
        height: scales(24),
        borderRadius: scales(2),
        resizeMode: 'contain',
    },
    text: {
        flex: 1,
        paddingLeft: scales(8),
        ...Fonts.w500,
        fontSize: scales(16),
        color: Colors.color_090F24,
    },
    button: {
        marginRight: scales(16),
    },
});
