import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            width: 300,
            height: 60,
            marginTop: 19,
        },
        touchable: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        avatar: {
            height: 45,
            width: 45,
            borderRadius: 50,
            marginLeft: 10,
            borderColor: theme.BORDER_COLOR,
            borderWidth: 1,
        },
        imageContainer: {
            flex: 1,
        },
        textContainer: {
            flex: 9,
        },
        text: {
            color: theme.TEXT,
            fontSize: 15,
            marginLeft: 40,
        },
    });

export default createStyles;
