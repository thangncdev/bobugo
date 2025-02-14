import { i18n as _i18n, TFunction } from 'i18next';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageType } from 'constants/constants';
import i18next from 'i18n';
import Storages, { KeyStorage } from 'utils/storages';

interface Props {
    children: React.ReactElement;
}

interface ILanguageContext {
    t: TFunction<'translation'>;
    i18n: _i18n;
    language: LanguageType;
    updateLanguage: (language: LanguageType) => void;
}

type ISettingContext = ILanguageContext;

const SettingContext = createContext<ISettingContext>({} as ISettingContext);

const SettingProvider = (props: Props) => {
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState<LanguageType>(LanguageType.ENGLISH);

    const findOldLanguage = () => {
        Storages.get(KeyStorage.Language).then(oldLanguage => {
            let languageCurrent: LanguageType;
            if (oldLanguage) {
                languageCurrent = oldLanguage as LanguageType;
            } else {
                languageCurrent = LanguageType.ENGLISH;
            }

            updateLanguage(languageCurrent);
        });
    };

    useEffect(() => {
        findOldLanguage();
    }, []);

    const updateLanguage = (value: LanguageType) => {
        setLanguage(value);
        i18next.changeLanguage(value).then(() => {
            Storages.set(KeyStorage.Language, value).catch();
        });
    };

    return (
        <SettingContext.Provider value={{ t, i18n, language, updateLanguage }}>
            {props.children}
        </SettingContext.Provider>
    );
};

export const useSetting = () => useContext(SettingContext);
export default SettingProvider;
