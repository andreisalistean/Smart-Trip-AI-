import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';
import { FontTypes } from 'utils/const';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        mainContent: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
            paddingTop: 20,
            paddingHorizontal: 20,
        },
        containerView: {
            alignItems: 'center',
            marginTop: 25,
        },
        title: {
            fontFamily: FontTypes.BOLD,
            fontSize: 34,
            color: theme.TEXT,
            marginBottom: 20,
        },
    });

export default createStyles;
