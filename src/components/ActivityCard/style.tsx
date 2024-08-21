import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

const styles = StyleSheet.create({
    btnX: { position: 'absolute', right: 0, margin: 5 },
    card: {
        backgroundColor: Colors.DARK_PURPLE,
        borderRadius: 20,
        overflow: 'hidden',
        margin: 10,
        width: 170,
        padding: 4,
        height: 140,
    },
    textContainer: {
        padding: 10,
    },
    buttonArrowContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: -15,
        left: 72,
    },
    description: {
        color: Colors.WHITE,
        marginTop: 20,
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 12,
    },
    icons: {
        marginLeft: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Colors.BACKGROUND_DARK,
        borderRadius: 10,
        padding: 20,
        width: '85%',
        height: '40%',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 23,
    },
    fullDescription: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    closeTouchBottom: {
        position: 'absolute',
        bottom: 0,
        height: '30%',
        width: '100%',
        zIndex: 1,
    },
    closeTouchTop: {
        position: 'absolute',
        top: 0,
        height: '30%',
        width: '100%',
        zIndex: 1,
    },
});

export default styles;
