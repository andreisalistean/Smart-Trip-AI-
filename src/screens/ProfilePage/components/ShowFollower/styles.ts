import { StyleSheet } from 'react-native';

import { Colors } from '../../../../utils/colors';
export const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: Colors.DARK_PURPLE,
        paddingTop: 20,
        width: 220,
        height: 60,
        borderRadius: 10,
        opacity: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: -30,
    },
    titleName: {
        fontSize: 12,
        color: Colors.WHITE,
        textAlign: 'center',
    },
});
