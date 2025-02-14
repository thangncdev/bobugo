import { t } from 'i18next';
import WAValidator from 'multicoin-address-validator';
import { Linking } from 'react-native';

import Images from 'assets/images';
import DialogUtil from 'components/dialog';
import { DialogType } from 'constants/constants';
import { CurrencyUnit } from 'modules/markets/src/constants';
import { navigate } from 'modules/navigation/src/utils';

export const goToAddAddress = () => navigate('AddAddress');

export const isInvalidAddress = (address: string) => {
    return !WAValidator.validate(address.trim(), CurrencyUnit.ADA)
}

const showDialogGoToSetting = () => {
    DialogUtil.showMessageDialog({
        title: t('would_like'),
        onConfirm: goToSettingsDevice,
        type: DialogType.TWO,
        textButtonClose: t('dont_allow'),
        textButtonConfirm: t('ok'),
        icon: Images.WARNING,
    }).catch();
};

const goToSettingsDevice = () => {
    DialogUtil.dismiss();
    Linking.openSettings().catch();
};

export const goToPortfolioDetail = (id: number, name: string) => navigate('WalletDetail', { id, name });

export const goToEditPortfolio = (item: portfolio.Item) => navigate('EditAddress', item);

export const handleCheckPermission = async (
    hasPermission: boolean | void,
    requestPermission: () => Promise<boolean>,
    setValue: (value: string) => void
) => {
    if (!hasPermission) {
        const request = await requestPermission();
        if (!request) {
            showDialogGoToSetting();
            return;
        }
    }
    navigate('ScanAddress', { setValue });
};
