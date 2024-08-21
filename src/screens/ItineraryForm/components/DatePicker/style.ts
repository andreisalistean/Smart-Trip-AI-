import { Platform, StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        text: {
            color: theme.TEXT,
            fontSize: Platform.OS === 'ios' ? 16 : 14,
        },
        textWhiteOpacity: {
            color: theme.PLACEHOLDER_TEXT,
            fontSize: 13,
        },
    });

export default createStyles;
