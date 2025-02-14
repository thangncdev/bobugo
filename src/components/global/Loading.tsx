import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import Spinner, { SpinnerType } from 'react-native-spinkit';

import { Colors } from 'themes';

interface LoadingProps {
    spinnerSize?: number;
    spinnerType?: SpinnerType;
    spinnerColor?: string;
}

const Loading = (props: LoadingProps) => {
    const { spinnerSize, spinnerType, spinnerColor } = props;

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        global.showLoading = show;
        global.hideLoading = hide;
    }, []);

    const show = () => {
        Keyboard.dismiss();
        setVisible(true);
    };

    const hide = () => setVisible(false);

    return (
        <Modal isVisible={visible}>
            <View style={styles.modal}>
                <Spinner
                    size={spinnerSize}
                    type={spinnerType || 'ChasingDots'}
                    color={spinnerColor || Colors.color_199744}
                />
            </View>
        </Modal>
    );
};

export default Loading;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        ...StyleSheet.absoluteFillObject,
    },
});

