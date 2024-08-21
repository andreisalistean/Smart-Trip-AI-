import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        viewTabFocus: {
            width: '100%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        viewTabUnfocus: {
            width: '80%',
            height: '60%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        imgTab: {
            resizeMode: 'contain',
            width: '70%',
            height: '70%',
        },
        profileImage: {
            resizeMode: 'contain',
            width: 25,
            height: 25,
            borderRadius: 20,
        },
        focusedImage: {
            width: 32,
            height: 32,
            borderWidth: 1,
            borderColor: theme.FOCUSED_ICON,
        },
    });

export default createStyles;
