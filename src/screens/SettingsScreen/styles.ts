import { StyleSheet } from 'react-native';

import { Colors, Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 15,
            backgroundColor: theme.BACKGROUND,
            justifyContent: 'space-between',
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 16,
        },
        header: {
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
            color: theme.HEADER_TEXT,
        },
        dropDownContainer: {
            borderWidth: 1,
            borderColor: theme.BACKGROUND,
            borderRadius: 8,
            marginBottom: 16,
            overflow: 'hidden',
        },
        dropDownHeader: {
            padding: 16,
            backgroundColor: theme.DROPDOWN_BACKGROUND,
        },
        dropDownHeaderText: {
            fontSize: 16,
            color: Colors.BRIGHT_DARK,
        },
        dropDownList: {
            borderTopWidth: 1,
            borderTopColor: theme.BACKGROUND,
        },
        languageItem: {
            padding: 16,
            backgroundColor: theme.DROPDOWN_BACKGROUND,
        },
        languageText: {
            fontSize: 16,
            color: theme.DROPDOWN_TEXT,
        },
        toggleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        toggleLabel: {
            fontSize: 16,
            flex: 1,
            color: theme.TEXT,
        },
    });

export default createStyles;
