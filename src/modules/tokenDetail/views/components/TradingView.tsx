import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import DialogUtil from 'components/dialog';
import { useSetting } from 'contexts/SettingProvider';
import { masterdataNftIntervalsSelector, masterdataSupportWebsiteSelector, masterdataTokenIntervalsSelector } from 'modules/masterdata/src/selectors';
import { isTokenKey } from 'modules/tokenDetail/src/utils';
import IntervalsSelection from 'modules/tokenDetail/views/components/IntervalSelection';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales';

interface TradingViewProps {
    token: tokenDetail.RouteParams;
}

const TradingView = (props: TradingViewProps) => {
    const { t } = useSetting();
    const { token } = props;

    const tokenIntervals = useSelector(masterdataTokenIntervalsSelector);
    const nftIntervals = useSelector(masterdataNftIntervalsSelector);
    const masterdataSupportWebsite = useSelector(masterdataSupportWebsiteSelector);

    const tokenKey = token.key as markets.TokenKey;
    const nftKey = token.key as markets.NftKey;

    const isToken = useMemo(() => isTokenKey(token.key), []);
    const intervals = isToken ? tokenIntervals : nftIntervals;

    const [interval, setInterval] = useState<masterdata.Interval>(intervals[8] || intervals[0]);

    const dropdownInterval = useRef<View>(null);

    const key = isToken ? `unit=${tokenKey?.unit}` : `policy=${nftKey?.policy}`
    const urlObject = `${masterdataSupportWebsite?.CHART_URL ?? Config.CHART_URL}/?${key}&interval=${interval.key}&numIntervals=180`;

    const onShowDropdownInterval = () => {
        dropdownInterval.current.measure(
            (x, y, width, height, px, py) => {
                const dropdownConfig = {
                    marginTop: py + height + scales(2),
                    marginLeft: px,
                    children: (
                        <IntervalsSelection
                            width={width}
                            height={height}
                            intervals={intervals}
                            interval={interval}
                            setInterval={setInterval}
                        />
                    ),
                };
                DialogUtil.showDropdown(dropdownConfig).catch();
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View ref={dropdownInterval} collapsable={false}>
                    <TouchableOpacity onPress={onShowDropdownInterval} style={styles.buttonInterval}>
                        <Text style={styles.textInterval}>
                            {`${t('interval')}: ${interval.label}`}
                        </Text>
                        <Svgs.IcArrowDown width={scales(16)} height={scales(16)} />
                    </TouchableOpacity>
                </View>
            </View>
            <WebView
                startInLoadingState
                originWhitelist={['*']}
                mixedContentMode={'always'}
                androidLayerType={'hardware'}
                automaticallyAdjustContentInsets
                style={styles.webView}
                source={{ uri: urlObject }}
            // onLoadProgress={({ nativeEvent }) => {
            //     setLoadingProgress(nativeEvent.progress);
            // }}
            />
        </View>
    )
};

export default TradingView;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: (Sizes.screenWidth - scales(24)) * 225 / 336 + scales(72),
        paddingHorizontal: scales(12),
        backgroundColor: Colors.color_FFFFFF,
        paddingBottom: scales(24),
    },
    header: {
        flexDirection: 'row',
        height: scales(32),
        marginBottom: scales(16),
    },
    buttonInterval: {
        flexDirection: 'row',
        height: scales(32),
        backgroundColor: Colors.color_090F24,
        borderRadius: scales(4),
        paddingHorizontal: scales(4),
        alignItems: 'center',
    },
    textInterval: {
        ...Fonts.w500,
        fontSize: scales(16),
        color: Colors.color_E9EAEC,
        paddingRight: scales(4),
    },
    webView: {
        width: '100%',
        height: (Sizes.screenWidth - scales(24)) * 225 / 336,
    },
});
