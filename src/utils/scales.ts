import Config from 'react-native-config';

import SIZES from 'themes/sizes';

export default function scales(size: number): number {
    return size * SIZES.screenHeight / parseInt(Config.HEIGHT_DESIGN!);
}
