import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageType } from 'constants/constants';

export enum KeyStorage {
    Language = 'bamboo_language',
    LastEmailLogin = 'bamboo_last_email_login',
    AgreedTermsPrivacy = 'bamboo_agreed_terms_privacy',
}

type StorageValue = LanguageType | string;

const get = async (key: KeyStorage): Promise<string | undefined> => {
    const value = await AsyncStorage.getItem(key);
    return value || undefined;
}

const set = async (key: KeyStorage, value: StorageValue) => {
    await AsyncStorage.setItem(key, value);
}

const remove = async (key: KeyStorage) => {
    await AsyncStorage.removeItem(key);
}

const Storages = {
    get,
    set,
    remove,
};

export default Storages;
