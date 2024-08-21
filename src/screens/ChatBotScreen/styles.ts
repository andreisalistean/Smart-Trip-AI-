import { Platform, StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';
export const styles = StyleSheet.create({
    mainCont: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 15,
        borderRadius: 100,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 27,
    },
    back: {
        paddingLeft: 0,
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: Colors.WHITE,
        paddingLeft: 19,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: Colors.DARK_GREY,
        paddingBottom: 22,
        marginTop: 10,
        paddingTop: 20,
    },
    input: {
        flex: 1,
        color: Colors.WHITE,
        backgroundColor: Colors.DARK_PURPLE,
        borderRadius: 25,
        paddingHorizontal: Platform.OS === 'ios' ? 21 : 15,
        paddingVertical: Platform.OS === 'ios' ? 18 : 7,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: Colors.DARK_PURPLE,
        borderRadius: 25,
        padding: Platform.OS === 'ios' ? 18 : 11,
    },
    sendButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    aiMessage: {
        flexDirection: 'row',
        backgroundColor: Colors.PURPLE,
        padding: 10,
        paddingRight: 36,
        borderRadius: 10,
        marginBottom: 5,
        alignSelf: 'flex-start',
        maxWidth: '84%',
        flexWrap: 'wrap',
    },
    userMessage: {
        flexDirection: 'row-reverse',
        backgroundColor: Colors.DARK_PURPLE,
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        alignSelf: 'flex-end',
        maxWidth: '84%',
        flexWrap: 'wrap',
    },
    messageText: {
        color: Colors.WHITE,
        marginLeft: 7,
        alignSelf: 'center',
        maxWidth: '85%',
    },
    avatarAI: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    avatarUser: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 8,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    loadingAvatar: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 10,
    },
    loadingDots: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.PURPLE,
        padding: 10,
        borderRadius: 90,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.DARK_GREY,
        marginHorizontal: 2,
    },
});
