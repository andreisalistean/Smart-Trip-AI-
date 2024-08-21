import { StyleSheet } from 'react-native';

import { Colors, Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        touch: {
            padding: 10,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
        },
        view: {
            borderColor: Colors.DARK_GREY,
            borderWidth: 2,
            margin: 5,
            width: 20,
            height: 20,
        },
        img: {
            width: 15,
            height: 15,
        },
        text: {
            color: theme.TEXT,
        },
    });

export default createStyles;
