import { StyleSheet } from 'react-native';

import { Theme } from '../../utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingScreen: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

export default createStyles;
