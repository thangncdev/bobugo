import { StyleSheet, Text, View } from 'react-native'

import { useSetting } from 'contexts/SettingProvider';
import { Colors } from 'themes'
import TextStyles from 'themes/textStyles'
import scales from 'utils/scales'

interface EmptyDataProps {
    description?: string;
}
const EmptyView = (props: EmptyDataProps) => {
    const { t } = useSetting();

    return (
        <View style={styles.container}>
            <Text style={styles.textDes}>{props.description || t('no_data')}</Text>
        </View>
    );
};

export default EmptyView;

const styles = StyleSheet.create({
    container: {
        height: scales(200),
        alignItems: 'center',
        justifyContent: 'center',

    },
    textDes: {
        ...TextStyles.Body3,
        color: Colors.color_A1AFC3,
    },
})
