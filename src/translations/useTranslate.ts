import { useCallback, useEffect, useState } from 'react';

import { i18n } from './i18n';

function useTranslate() {
    const [, setLocale] = useState(i18n.locale);

    useEffect(() => {
        const handleChange = () => {
            setLocale(i18n.locale);
        };

        i18n.onChange(handleChange);
    }, []);

    return useCallback(
        (textKey: string | null | undefined) =>
            textKey
                ? i18n.t(textKey, { defaultValue: textKey }) || textKey
                : '',
        [],
    );
}

export default useTranslate;
