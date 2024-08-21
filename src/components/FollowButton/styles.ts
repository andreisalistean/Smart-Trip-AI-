import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: Colors.WHITE,
        fontSize: 10,
        alignSelf: 'center',
        backgroundColor: Colors.TRANSPARENT_GREY,
    },
    errorText: {
        color: Colors.RED,
        marginBottom: 5,
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    followButton: {
        backgroundColor: Colors.PURPLE,
    },
    unfollowButton: {
        backgroundColor: Colors.DARK_PURPLE,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 11,
    },
});
