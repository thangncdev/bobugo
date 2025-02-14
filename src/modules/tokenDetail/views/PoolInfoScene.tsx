import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Skeleton from 'components/skeleton/Skeleton';
import { tokenDetailActionCreators } from 'modules/tokenDetail/src/actions';
import PoolInfoItem from 'modules/tokenDetail/views/components/PoolInfoItem';
import { AppDispatch } from 'redux/store';
import scales from 'utils/scales';

const screenWidth = Dimensions.get('window').width;

interface PoolInfoProps {
    token: tokenDetail.RouteParams;
}

const PoolInfoScene = (props: PoolInfoProps) => {
    const { token } = props;
    const dispatch = useDispatch<AppDispatch>();

    const [poolInfo, setPoolInfo] = useState<tokenDetail.PoolInfo>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getPoolInfo();
    }, []);

    const getPoolInfo = () => {
        const payload: tokenDetail.GetPoolInfoActionPayload = {
            key: token.key,
            onSuccess,
            onFailure,
        }
        dispatch(tokenDetailActionCreators.getPoolInfo(payload));
    }

    const onSuccess = (data: tokenDetail.PoolInfo) => {
        setPoolInfo(data);
        setLoading(false);
    };

    const onFailure = () => {
        setLoading(false);
    };

    const renderPoolInfo = () => poolInfo?.table_data.map((e, i) => (
        <PoolInfoItem
            key={i.toString()}
            title={e.label}
            value={e.value}
            lastItem={i + 1 === poolInfo?.table_data?.length}
        />
    ));

    const renderTableSkeleton = () => (
        <View style={{ paddingHorizontal: scales(16) }} >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(index => skeletonItem(index))}
        </View>
    );

    const skeletonItem = (index: number) => (
        <View key={index.toString()} style={styles.skeletonItemContainer}>
            <Skeleton width={(screenWidth - scales(32))} height={scales(36)} />
        </View>
    )

    const renderTable = () => loading ? renderTableSkeleton() : renderPoolInfo()

    return (
        <View style={styles.container}>
            {renderTable()}
        </View>
    );
};

export default PoolInfoScene;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skeletonItemContainer: {
        marginBottom: scales(12),
    },

})
