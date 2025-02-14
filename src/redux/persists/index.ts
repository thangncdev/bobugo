import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import Config from 'react-native-config';
import { Reducer } from 'redux';
import { createTransform, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

/**
 *
 * @param key Key to store all the states in this reducer
 * @param reducer Reducer function to derive the state for the given key
 * @param whitelist Array of keys that should be persisted in the provided reducer
 * @param sensitiveInfoWhitelist Array of keys that should be encrypted before they are persisted. Should be a subset of whitelist
 * @param version Version of the state to be persisted. Check migration doc from redux persist for more info https://github.com/rt2zz/redux-persist/blob/v5.10.0/docs/migrations.md.
 * Default to -1 if not provided (which is the default value by redux-persist).
 * If you are using sensitiveInfoWhitelist, you need to make sure that the version is > unencryptedVersion. This is important so that the previously persisted state that are not encrypted will get migrated
 * to the encrypted version before going through the decryption process. For more info please refer to https://moneylion.atlassian.net/wiki/spaces/Mobile/pages/1358725549
 */

export default function persistReducerUtil(key: string, reducer, whitelist?: string[], sensitiveInfoWhitelist?: string[], version: number = -1): Reducer<PersistPartial> {
    const transforms = [
        createTransform (
            // Transform state on its way to being serialized and stored
            (inboundState, _key) => {
                const jsonString = JSON.stringify(inboundState);
                return CryptoJS.AES.encrypt(
                    jsonString,
                    Config.ENCRYPTION_KEY,
                ).toString();
            },
            // Transform state being rehydrated
            (outboundState, _key) => {
                const bytes = CryptoJS.AES.decrypt(outboundState, Config.ENCRYPTION_KEY);
                return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            },
            {
                whitelist: sensitiveInfoWhitelist,
            }
        ),
    ];

    const persistConfig = {
        storage: AsyncStorage,
        key,
        whitelist,
        debug: __DEV__,
        transforms,
        stateReconciler: autoMergeLevel2,
        version,
    };

    return persistReducer(persistConfig, reducer);
}
