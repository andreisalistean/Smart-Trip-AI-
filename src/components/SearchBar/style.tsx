import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            height: 46,
            borderRadius: 8,
            paddingHorizontal: 10,
            backgroundColor: theme.OVERCARD_BACKGROUND,
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            fontSize: 20,
            color: theme.ICON_COLOR,
            marginRight: 14,
            marginLeft: 3,
        },
        textInput: {
            flex: 1,
            color: theme.TEXT,
        },
        results: {
            marginTop: 20,
        },
        resultText: {
            color: theme.TEXT,
        },
    });

export default createStyles;
