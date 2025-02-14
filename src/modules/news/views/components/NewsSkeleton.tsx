import { Dimensions, StyleSheet, View } from 'react-native'

import Skeleton from 'components/skeleton/Skeleton'
import scales from 'utils/scales'

const screenWidth = Dimensions.get('window').width;

const NewsSkeleton = () => {
    const renderSkeletonItem = () => (
        <View style={styles.skeletonItemContainer}>
            <Skeleton width={(screenWidth - scales(32))} height={scales(150)} />
        </View>
    );

    return (
        <View>
            {renderSkeletonItem()}
            {renderSkeletonItem()}
            {renderSkeletonItem()}
        </View>
    )
}

export default NewsSkeleton;

const styles = StyleSheet.create({
    skeletonItemContainer: {
        marginBottom: scales(16),
    },
})
