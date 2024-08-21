import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

export const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 10,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 20,
        alignSelf: 'center',
        textAlign: 'center',
    },
});
