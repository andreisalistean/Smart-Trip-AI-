import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        liniar: { borderRadius: 30 },
        container: {
            flexDirection: 'row',
            paddingVertical: 10,
            borderRadius: 10,
        },
        item: {
            backgroundColor: theme.OVERCARD_BACKGROUND,
            borderRadius: 30,
            marginHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        selectedTouch: {
            borderRadius: 30,
            marginHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        itemTextSelected: {
            fontSize: 16,
            color: theme.OVERCARD_BACKGROUND,
        },
        itemText: {
            fontSize: 16,
            color: theme.TEXT,
        },
        selectedText: {
            color: theme.TEXT,
        },
        selectedItem: {
            backgroundColor: theme.TEXT,
        },
    });

export default createStyles;
