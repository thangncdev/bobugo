import { upperFirst } from 'lodash';
import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import EmptyView from 'components/skeleton/EmptyView'
import PortfolioAssetItem from 'modules/walletDetail/views/components/PortfolioAssetItem';
import PortfolioAssetsSkeleton from 'modules/walletDetail/views/components/PortfolioAssetsSkeleton';
import PortfolioChart from 'modules/walletDetail/views/components/PortfolioChart';
import PortfolioPercent from 'modules/walletDetail/views/components/PortfolioPercent';
import { Colors, Fonts, Sizes } from 'themes';
import scales from 'utils/scales'

interface Props {
    portfolio: walletDetail.PortfolioData & FlatListLoadData,
    onRefresh: () => void;
    showBalance: boolean,
}

const PortfolioAssets = (props: Props) => {
    const { showBalance, portfolio } = props;

    const [desc, setDesc] = useState<boolean>(true);

    const { asset_list } = portfolio;

    const keyExtractor = (item: walletDetail.AssetItem, index: number) => index.toString();

    const refreshControl = () => (
        <RefreshControl
            refreshing={props.portfolio.refreshing}
            onRefresh={props.onRefresh}
            tintColor={Colors.color_199744}
            colors={[Colors.color_199744]}
        />
    );

    const renderHeaderTable = (header: masterdata.NftHeader) => (
        <View style={styles.headerList}>
            {header?.colums?.map((colum, index) => {
                if (index === header?.colums.length - 1) {
                    return (
                        <TouchableOpacity
                            key={index.toString()}
                            style={{
                                flex: Number(header.widthArr[index]) || 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: header.alignItems ? header.alignItems[index] : 'flex-start',
                            }}
                            onPress={() => setDesc(!desc)}
                        >
                            <Text style={[styles.labelHeader, { paddingRight: scales(2) }]} numberOfLines={2}>
                                {upperFirst(colum)}
                            </Text>
                            <View style={{ transform: [{ rotate: desc ? '0deg' : '180deg' }]}}>
                                <Svgs.IcArrowDownFill width={scales(16)} height={scales(16)} />
                            </View>
                        </TouchableOpacity>
                    )
                }
                return (
                    <View
                        key={index.toString()}
                        style={{
                            flex: Number(header.widthArr[index]) || 0,
                            alignItems: header.alignItems ? header.alignItems[index] : 'flex-start',
                            marginRight: scales(5),
                        }}
                    >
                        <Text style={styles.labelHeader} numberOfLines={2}>{upperFirst(colum)}</Text>
                    </View>
                )
            })}
        </View>
    );

    const renderItem = ({ item, index }) => {
        const header = asset_list.asset_header;
        if (index === 0 && item === 0) {
            return renderHeaderTable(header);
        } else {
            return (
                <PortfolioAssetItem
                    item={item}
                    showBalance={showBalance}
                    header={header}
                />
            );
        }
    };

    const renderHeader = () => (
        <>
            <PortfolioPercent portfolio={portfolio} />
            <PortfolioChart portfolio={portfolio} />
        </>
    );

    const assetsFinal = () => {
        const dataSort = asset_list?.asset_data ?? [];
        return dataSort.sort((a, b) => {
            const percentA = parseFloat((a.colums[3].split('\n') || ['', ''])[0]);
            const percentB = parseFloat((b.colums[3].split('\n') || ['', ''])[0]);
            return desc ? (percentB - percentA) : (percentA - percentB);
        });
    };

    return portfolio.fetching ? <PortfolioAssetsSkeleton /> : (
        <FlatList
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            refreshControl={refreshControl()}
            data={[0, ...assetsFinal()]}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={!props.portfolio.fetching && <EmptyView />}
            ListHeaderComponent={renderHeader()}
        />
    );
}

export default PortfolioAssets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingTop: scales(16),
        paddingBottom: Sizes.bottomSpace + scales(10),
    },
    headerList: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scales(10),
        backgroundColor: Colors.color_199744,
        minHeight: scales(38),
    },
    labelHeader: {
        ...Fonts.w400,
        fontSize: scales(12),
        lineHeight: scales(16),
        color: Colors.color_FFFFFF,
        textAlign: 'center',
    },
})
