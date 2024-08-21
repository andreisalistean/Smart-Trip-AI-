import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.BACKGROUND,
            flex: 1,
        },
        stripeContainer: {
            width: '100%',
            padding: 5,
            marginTop: 22,
        },
    });

export default createStyles;
