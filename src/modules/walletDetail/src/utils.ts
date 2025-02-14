import BigNumber from 'bignumber.js';
import { t } from 'i18next';

import { Colors } from 'themes';

export const stringToFloat = (str: string) => {
    const floatValue = parseFloat(str);
    if (isNaN(floatValue)) {
        return 0;
    } else {
        return floatValue;
    }
};

export const getFinalAssets = (assets: walletDetail.AssetPercent[]) => {
    const assetsFinal = assets.filter(asset => !new BigNumber(asset.percenter.replace('%', '')).isZero());
    if (assetsFinal.length <= 3) {
        return assetsFinal;
    } else {
        const sortedAssets = assetsFinal.sort((a, b) => {
            const percentA = stringToFloat(a.percenter.replace('%', ''))
            const percentB = stringToFloat(b.percenter.replace('%', ''))
            return percentB - percentA;
        });
        let percentOthers = '0';
        sortedAssets.slice(3).forEach(sortedAsset => {
            const percent = new BigNumber(sortedAsset.percenter.replace('%', '')).toString();
            percentOthers = new BigNumber(percentOthers).plus(percent).toFixed(2).toString();
        });

        return [
            ...assetsFinal.slice(0, 3),
            {name: t('others'), percenter: `${percentOthers}%` },
        ]
    }
};

export const getAssetColor = (index: number) => {
    switch (index) {
        case 0:
            return Colors.color_4A71F5;
        case 1:
            return Colors.color_17C585;
        case 2:
            return Colors.color_F5B87F;
        case 3:
            return Colors.color_A2A4AA;
        default:
            return '';
    }
};
