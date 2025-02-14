import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LanguageType } from 'constants/constants';
import en from 'i18n/en';
import vi from 'i18n/vi';

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    interpolation: {
        escapeValue: true,
    },
    lng: LanguageType.ENGLISH,
    fallbackLng: LanguageType.ENGLISH,
    resources: {
        en: { translation: en },
        vi: { translation: vi },
    },
}).catch(_err => {
    // TODO: Log i18n init failed
});

export default i18next;
