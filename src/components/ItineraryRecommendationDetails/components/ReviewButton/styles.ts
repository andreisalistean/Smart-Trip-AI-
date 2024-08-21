import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';
import { FontTypes } from 'utils/const';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        width: '95%',
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.BACKGROUND_DARK,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
        backgroundColor: Colors.TRANSPARENT_GREY_7,
    },
    topView: {
        position: 'absolute',
        top: 0,
        height: '30%',
        width: '100%',
        zIndex: 1,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        height: '30%',
        width: '100%',
        zIndex: 1,
    },
    reviewTitle: {
        fontFamily: FontTypes.BOLD,
        fontSize: 24,
        color: Colors.WHITE,
    },
    reviewText: {
        color: Colors.MAGENTA,
        fontSize: 22,
        marginBottom: 5,
        marginTop: 5,
    },
    reviewInput: {
        height: 100,
        fontSize: 18,
        width: '90%',
        marginTop: 30,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default styles;
