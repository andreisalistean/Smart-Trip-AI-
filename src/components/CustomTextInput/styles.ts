import { StyleSheet } from 'react-native';

import { Theme } from '../../utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        input: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: theme.BORDER_COLOR,
            height: 46,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            color: theme.TEXT,
        },
        textStyle: {
            flex: 1,
            paddingRight: 10,
            color: theme.TEXT,
        },
    });

export default createStyles;
