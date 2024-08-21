import React, { useMemo } from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { styles } from './style';

export const Text = (props: TextProps) => {
    const { style, children } = props;

    const finalStyle = useMemo(() => [styles.defaultText, style], [style]);

    return (
        <RNText {...props} style={finalStyle}>
            {children}
        </RNText>
    );
};
