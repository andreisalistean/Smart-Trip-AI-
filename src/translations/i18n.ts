import { I18n } from 'i18n-js';

import enUS from './locales/en-US/translation.json';
import huHU from './locales/hu-HU/translation.json';
import roRO from './locales/ro-RO/translation.json';

export const i18n = new I18n({
    'en-US': enUS,
    'ro-RO': roRO,
    'hu-HU': huHU,
});

i18n.defaultLocale = 'en-US';
i18n.locale = 'en-US';

export const changeLanguage = (lng: string) => {
    i18n.locale = lng;
};
