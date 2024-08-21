import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        button: {
            position: 'absolute',
            bottom: 10,
            right: 10,
            padding: 12,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
        },
        buttonText: {
            color: theme.ICON_COLOR,
            fontSize: 11,
            fontWeight: 'bold',
        },
    });

export default createStyles;
