import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
            paddingHorizontal: 10,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.TEXT,
            marginVertical: 15,
            alignSelf: 'center',
        },
    });

export default createStyles;
