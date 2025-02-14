import { RouteProp } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'

import Svgs from 'assets/svgs'
import { Image, TouchableOpacity } from 'components/base'
import { START_PAGE } from 'constants/constants'
import { useSetting } from 'contexts/SettingProvider'
import { marketActionCreators } from 'modules/markets/src/actions'
import { SEARCH_NFTS_DATA, SEARCH_TOKENS_DATA, TokensType } from 'modules/markets/src/constants'
import HeaderView from 'modules/markets/views/components/HeaderView';
import { goBack } from 'modules/navigation/src/utils'
import { RootNavigatorParamList } from 'modules/navigation/typings'
import { goToTokenDetail } from 'modules/tokenDetail/src/utils';
import { Colors, Fonts, Sizes } from 'themes'
import scales from 'utils/scales'

type MarketSearchScreenProps = {
    onSelectCurrency?: () => void
    route: RouteProp<RootNavigatorParamList, 'MarketSearch'>;
}
interface MarketSearchScreenDispatchProps {
    searchTokens: typeof marketActionCreators.searchTokens;
    searchNfts: typeof marketActionCreators.searchNfts;
    saveTokensRecently: typeof marketActionCreators.saveTokensRecently,
    saveNftsRecently: typeof marketActionCreators.saveNftsRecently,
}

interface MarketSearchScreenStateToProps {
    tokensRecently: markets.SearchTokensItem[];
    nftsRecently: markets.SearchNftItem[];
}

const MarketSearchScreen = (props: MarketSearchScreenProps & MarketSearchScreenDispatchProps & MarketSearchScreenStateToProps) => {
    const { t } = useSetting();
    const { searchTokens, searchNfts, tokensRecently, nftsRecently, saveTokensRecently, saveNftsRecently } = props
    const isTokenSearch = useMemo(
        () => props.route.params.tokenType === TokensType.TOKEN,
        [props.route.params.tokenType])
    const [searchText, setSearchText] = useState<string>('')

    const [dataNfts, setNftsData] = useState<markets.SearchNftsData & FlatListLoadData>(SEARCH_NFTS_DATA);
    const [dataTokens, setTokensData] = useState<markets.SearchTokensData & FlatListLoadData>(SEARCH_TOKENS_DATA);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (isEmpty(searchText.trim())) { return }
            if (isTokenSearch) {
                _searchTokens()
            } else {
                _searchNfts()
            }
        }, 300)
        return () => clearTimeout(delayDebounceFn)
    }, [searchText])

    const _searchTokens = (page: number = START_PAGE, oldData: markets.SearchTokensItem[] = []) => {
        const payload: markets.SearchTokensActionPayload = {
            name: searchText,
            page,
            oldData,
            onTokensSuccess,
            onTokensFailure,
        }
        searchTokens(payload);
    }

    const _searchNfts = (page: number = START_PAGE, oldData: markets.SearchNftItem[] = []) => {
        const payload: markets.SearchNftsActionPayload = {
            name: searchText,
            page,
            oldData,
            onNftsSuccess,
            onNftsFailure,
        }
        searchNfts(payload);
    }

    const onNftsSuccess = (_data: markets.SearchNftsData) => {
        setNftsData({
            ..._data,
            fetching: false,
            refreshing: false,
            canLoadMore: true,
        });
    };

    const onNftsFailure = () => {
        setNftsData((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    };

    const onTokensSuccess = (_data: markets.SearchTokensData) => {
        setTokensData({
            ..._data,
            fetching: false,
            refreshing: false,
            canLoadMore: true,
        });
    };

    const onTokensFailure = () => {
        setTokensData((prevState) => {
            return {
                ...prevState,
                fetching: false,
                refreshing: false,
            }
        });
    };

    const searchBox = () => (
        <View style={styles.searchBox}>
            <TouchableOpacity onPress={() => goBack()}>
                <Svgs.IcArrowLeft width={scales(24)} height={scales(24)} />
            </TouchableOpacity>
            <TextInput
                value={searchText}
                placeholder={t(isTokenSearch ? 'find_token' : 'find_nft')}
                style={styles.textInput}
                onChangeText={setSearchText}
                placeholderTextColor={Colors.color_090F24}
                maxLength={255}
                autoFocus={true}
            />
        </View>
    )

    const renderEmpty = () => <View />;

    const renderLabel = (label: string) => (
        <Text style={styles.headerLabel}>{label}</Text>
    )

    const renderRecently = () => isTokenSearch ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={tokensRecently}
            stickyHeaderIndices={[0]}
            renderItem={renderTokenItem}
            keyExtractor={(_item, index) => `RenderRecently${index}`}
            ListEmptyComponent={renderEmpty()}
            ListHeaderComponent={renderLabel(t('Recently'))}
        />
    ) : (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={nftsRecently}
            stickyHeaderIndices={[0]}
            renderItem={renderNftItem}
            keyExtractor={(_item, index) => `RenderRecently${index}`}
            ListEmptyComponent={renderEmpty()}
            ListHeaderComponent={renderLabel(t('Recently'))}
        />
    );

    const renderTokenItem: ListRenderItem<markets.SearchTokensItem> = ({ item }) => (
        <TouchableOpacity style={styles.tokenResultRow} onPress={() => onPressTokenItem(item)}>
            <View style={styles.contentItem}>
                <Image uri={item?.icon} style={styles.imageCurrency} />
                <View style={{ justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.textName}>
                        {item?.name?.trim()}
                    </Text>
                    {!isEmpty(item?.category?.trim()) && <Text numberOfLines={1} style={styles.subTextName}>
                        {item?.category}
                    </Text>}
                </View>
            </View>
            {renderPrice(item?.price_ada, item?.price_usd)}
            {renderCap(item?.volume_ada, item?.volume_usd)}
            {/* {item?.isRecently ? (*/}
            {/*    <TouchableOpacity>*/}
            {/*        <Svgs.IcMoreOptionVertical />*/}
            {/*    </TouchableOpacity>*/}
            {/* ) : null}*/}
        </TouchableOpacity>
    );

    const onPressTokenItem = (item: markets.SearchTokensItem) => {
        goToTokenDetail({ name: item?.name, logo: item?.icon, key: { unit: item?.unit } });
        saveTokensRecently(item);
    }

    const renderNftItem: ListRenderItem<markets.SearchNftItem> = ({ item }) => (
        <TouchableOpacity style={styles.tokenResultRow} onPress={() => onPressTokenNft(item)}>
            <View style={styles.contentItem}>
                <Image uri={item?.logo} style={styles.imageCurrency} />
                <View style={{ justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={styles.textName}>
                        {item.name.trim()}
                    </Text>
                </View>
            </View>
            {renderPrice(item?.price_ada, item?.price_usd)}
            {renderCap(item?.volume_ada, item?.volume_usd)}
            {/* {item.isRecently ? (*/}
            {/*    <TouchableOpacity>*/}
            {/*        <Svgs.IcMoreOptionVertical />*/}
            {/*    </TouchableOpacity>*/}
            {/* ) : null}*/}
        </TouchableOpacity>
    );

    const renderPrice = (priceAbove, priceBelow) => (
        <HeaderView
            marginRight={scales(5)} flex={0.35} alignItems={'center'}
        >
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textNumber}>
                {priceAbove}
            </Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTextNumber}>
                {priceBelow}
            </Text>
        </HeaderView>
    );

    const renderCap = (volumeAbove, volumeBelow) => (
        <HeaderView flex={0.35} alignItems={'center'}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textNumber}>
                {volumeAbove}
            </Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTextNumber}>
                {volumeBelow}
            </Text>
        </HeaderView>
    );

    const onPressTokenNft = (item: markets.SearchNftItem) => {
        goToTokenDetail({ name: item?.name, logo: item?.logo, key: { policy: item?.policy } });
        saveNftsRecently(item);
    }

    const renderResults = () => isTokenSearch ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={dataTokens.dt}
            stickyHeaderIndices={[0]}
            renderItem={renderTokenItem}
            keyExtractor={(_item, index) => `Market${index}`}
            ListEmptyComponent={renderEmpty()}
            ListHeaderComponent={renderLabel(t('Results'))}
        />
    ) : (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={dataNfts.dt}
            stickyHeaderIndices={[0]}
            renderItem={renderNftItem}
            keyExtractor={(_item, index) => `Market${index}`}
            ListEmptyComponent={renderEmpty()}
            ListHeaderComponent={renderLabel(t('Results'))}
        />
    );

    return (
        <View style={styles.contentView}>
            {searchBox()}
            <View style={{ height: 1, backgroundColor: Colors.color_F6F7FB }} />
            <KeyboardAvoidingView style={styles.listContent} behavior="padding">
                {!isEmpty(searchText) && renderResults()}
                {isEmpty(searchText) && renderRecently()}
            </KeyboardAvoidingView>
        </View>
    )
}

const mapStateToProps = (state: GlobalState) => ({
    tokensRecently: state.markets.tokensRecently,
    nftsRecently: state.markets.nftsRecently,
});

const mapDispatchToProps = {
    searchTokens: marketActionCreators.searchTokens,
    searchNfts: marketActionCreators.searchNfts,
    saveTokensRecently: marketActionCreators.saveTokensRecently,
    saveNftsRecently: marketActionCreators.saveNftsRecently,
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketSearchScreen);

const styles = StyleSheet.create({
    contentView: {
        backgroundColor: Colors.color_FFFFFF,
        paddingTop: Sizes.statusBarHeight,
        flex: 1,
    },
    textInput: {
        ...Fonts.w400,
        fontSize: scales(11),
        color: Colors.color_090F24,
        flex: 1,
        backgroundColor: Colors.color_F6F7FB,
        height: scales(40),
        marginLeft: scales(8),
        borderRadius: scales(20),
        paddingHorizontal: scales(16),
    },
    searchBox: {
        flexDirection: 'row',
        paddingHorizontal: scales(16),
        paddingVertical: scales(8),
        alignItems: 'center',
    },
    listContent: {
        padding: scales(16),
    },
    headerLabel: {
        ...Fonts.w500,
        fontSize: scales(14),
        lineHeight: scales(20),
        color: Colors.color_212121,
        marginBottom: scales(16),
        backgroundColor: Colors.color_FFFFFF,
    },
    tokenResultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scales(16),
        borderBottomWidth: scales(1),
        borderColor: Colors.color_5E626F,
        paddingBottom: scales(8),
    },
    imageCurrency: {
        width: scales(24),
        height: scales(24),
        borderRadius: scales(24),
        resizeMode: 'cover',
        marginRight: scales(8),
    },
    textName: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(20),
        maxWidth: scales(160),
    },
    subTextName: {
        ...Fonts.w400,
        fontSize: scales(8),
        color: Colors.color_A2A4AA,
        lineHeight: scales(10),
    },
    textNumber: {
        ...Fonts.w500,
        fontSize: scales(12),
        color: Colors.color_090F24,
        lineHeight: scales(20),
    },
    subTextNumber: {
        ...Fonts.w400,
        fontSize: scales(10),
        color: Colors.color_A2A4AA,
        lineHeight: scales(10),
    },
    contentItem: {
        flex: 1,
        flexDirection: 'row',
    },
})
