import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';

import Svgs from 'assets/svgs';
import { TouchableOpacity } from 'components/base';
import { goBack } from 'modules/navigation/src/utils';
import { RootNavigatorParamList } from 'modules/navigation/typings';
import { Sizes } from 'themes';
import Colors from 'themes/colors';
import scales from 'utils/scales';

const SCAN_SIZE = Sizes.screenWidth - scales(136);

interface RouteProps {
    route: RouteProp<RootNavigatorParamList, 'ScanAddress'>;
}

const ScanAddressScreen = (props: RouteProps) => {
    const device = useCameraDevice('back');
    const { params } = props?.route;

    const [isActive, setIsActive] = useState(true);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const onCodeScanned = (codes: Code[]) => {
        if (isActive) {
            setIsActive(false);
            setTimeout(() => setIsActive(true), 5000);
            params?.setValue(codes?.[0].value);
        }
    };

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned,
    });

    const renderMask = () => (
        <View style={styles.maskView}>
            <View style={styles.rectangle}>
                <View style={[styles.viewCorner, styles.borderTopLeft]} />
                <View style={[styles.viewCorner, styles.borderTopRight]} />
                <View style={[styles.viewCorner, styles.borderBottomRight]} />
                <View style={[styles.viewCorner, styles.borderBottomLeft]} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnClose} onPress={goBack}>
                <Svgs.IcArrowLeft width={scales(24)} height={scales(24)} />
            </TouchableOpacity>
            {device ? (
                <Camera
                    onInitialized={() => setIsInitialized(true)}
                    style={isInitialized ? styles.cameraInitialzed : styles.cameraInitial}
                    device={device}
                    isActive={true}
                    codeScanner={codeScanner}
                />
            ) : (
                <View />
            )}
            {renderMask()}
        </View>
    );
};

export default ScanAddressScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnClose: {
        width: scales(24),
        height: scales(24),
        marginTop: Sizes.statusBarHeight + scales(30),
        marginLeft: scales(32),
        zIndex: 99,
    },
    cameraInitial: {
        width: 0,
        height: 0,
    },
    cameraInitialzed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    maskView: {
        position: 'absolute',
        top: scales(286),
        left: (Sizes.screenWidth - SCAN_SIZE) / 2,
    },
    rectangle: {
        width: SCAN_SIZE,
        height: SCAN_SIZE,
    },
    viewCorner: {
        width: scales(69),
        height: scales(69),
        position: 'absolute',
        borderColor: Colors.color_FFFFFF,
    },
    borderTopLeft: {
        borderTopWidth: scales(3),
        borderLeftWidth: scales(3),
        top: 0,
        left: 0,
    },
    borderTopRight: {
        borderTopWidth: scales(3),
        borderRightWidth: scales(3),
        top: 0,
        left: SCAN_SIZE - scales(69),
    },
    borderBottomRight: {
        borderBottomWidth: scales(3),
        borderRightWidth: scales(3),
        top: SCAN_SIZE - scales(69),
        left: SCAN_SIZE - scales(69),
    },
    borderBottomLeft: {
        borderBottomWidth: scales(3),
        borderLeftWidth: scales(3),
        top: SCAN_SIZE - scales(69),
        left: 0,
    },
});
