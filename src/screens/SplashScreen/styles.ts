import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.BACKGROUND,
        },
        logo: {
            height: 200,
            width: 200,
        },
    });

export default createStyles;
