import { Platform, StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        page: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingTop: Platform.OS === 'ios' ? 10 : 40,
        },
        icon: {
            fontSize: 20,
            color: theme.TEXT,
            marginRight: 10,
        },
        textInput: {
            flex: 1,
            color: theme.TEXT,
        },
        results: {
            paddingRight: 80,
        },
        resultText: {
            color: theme.TEXT,
        },
        noUserText: {
            color: theme.TEXT,
            marginTop: 30,
        },
    });

export default createStyles;
