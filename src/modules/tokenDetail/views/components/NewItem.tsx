import { Image, StyleSheet, Text, View } from 'react-native';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { useSetting } from 'contexts/SettingProvider';
import { navigate } from 'modules/navigation/src/utils';
import { tokenDetailActionCreators } from 'modules/tokenDetail/src/actions';
import { AppDispatch } from 'redux/store';
import { Colors } from 'themes';
import TextStyles from 'themes/textStyles';
import scales from 'utils/scales';

interface NewsItemProps {
    item: tokenDetail.NewsItem
}

const NewItem = (props: NewsItemProps) => {
    const { t } = useSetting();
    const dispatch = useDispatch<AppDispatch>();

    const goDetail = () => {
        navigate('NewsDetail', { newsId: props.item.id });
    }

    const handleShareNews = () => getNewsUri();

    const getNewsUri = () => {
        try {
            showLoading();
            const payload: tokenDetail.GetNewsUriActionPayload = {
                newsId: props.item.id,
                onSuccess,
                onFailure,
            }
            dispatch(tokenDetailActionCreators.getNewsUri(payload))
        } catch (error) {
            hideLoading();
        }
    }

    const onSuccess = async (res: tokenDetail.NewsUriData) => {
        hideLoading();
        await handleShare(res.url);
    }

    const onFailure = () => {
        showToastError(t('get_news_uri_fail'));
        hideLoading();
    }

    const handleShare = async (newsUri: string) => {
        if (newsUri === null) {
            showToastError(t('news_uri_empty'));
        } else {
            await Share.open({
                url: newsUri,
            });
        }
    }

    return (
        <TouchableOpacity onPress={goDetail} style={styles.container}>
            <View style={{ flexDirection: 'row', marginBottom: scales(16) }}>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={3} style={styles.title}>{props.item.title}</Text>
                    <View style={{ height: scales(4) }} />
                    <Text numberOfLines={4} style={styles.value} >{props.item.title}</Text>
                </View>
                <Image style={styles.imageAvatar} source={{ uri: props.item.image }} />
            </View>
            <View style={[styles.row]} >
                <View style={[styles.row, { flex: 1 }]}>
                    <Svgs.IcClock width={scales(20)} height={scales(20)} />
                    <Text style={styles.timePublish}>
                        {props.item.create_date}
                    </Text>
                </View>
                <View style={[styles.row]} >
                    <TouchableOpacity onPress={handleShareNews}>
                        <Svgs.IcShare width={scales(24)} height={scales(24)} color={Colors.color_FFFFFF} />
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        </TouchableOpacity>
    );
}

export default NewItem;

const styles = StyleSheet.create({
    container: {
        padding: scales(8),
        backgroundColor: Colors.color_199744,
        borderRadius: scales(5),
        marginTop: scales(16),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageAvatar: {
        width: scales(80),
        height: scales(80),
        borderRadius: 10,
        marginLeft: scales(8),
    },
    title: {
        ...TextStyles.Body1,
        color: Colors.color_FFFFFF,
    },
    value: {
        ...TextStyles.Body3,
        color: Colors.color_DCDBDB,
    },
    timePublish: {
        ...TextStyles.Body3,
        color: Colors.color_DCDBDB,
        marginLeft: scales(8),
    },
})
