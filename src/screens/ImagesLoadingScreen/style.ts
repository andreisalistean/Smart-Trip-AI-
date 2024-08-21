import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'utils/const';

export const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
        },
        imageContainer: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 1,
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        description: {
            fontSize: 20,
            fontWeight: '800',
            color: 'white',
            position: 'absolute',
            textAlign: 'center',
            marginHorizontal: 10,
        },
    });
