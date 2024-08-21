import { StyleSheet } from 'react-native';

import { Theme } from '../../utils/colors';
const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
        },
        gradient: {
            marginHorizontal: 8,
            marginTop: 58,
            borderRadius: 16,
            opacity: 0.8,
            alignItems: 'center',
            height: 200,
        },
        content: {
            marginTop: 32,
        },
        text: {
            color: 'white',
            fontSize: 32,
        },
        formContainer: {
            backgroundColor: theme.TRANSPARENT_BACKGROUND,
            marginHorizontal: 32,
            borderRadius: 14,
            borderColor: theme.BORDER_COLOR,
            bottom: 80,
            alignSelf: 'center',
            borderWidth: 1,
            padding: 15,
            paddingTop: 30,
        },
        loginButton: {
            height: 48,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            marginTop: 20,
        },
        labelText: {
            color: theme.TEXT,
            marginTop: 10,
            marginBottom: 10,
        },
        labelTextPass: {
            color: theme.TEXT,
            marginTop: 10,
        },
        loginTitle: {
            color: theme.TEXT,
            alignSelf: 'center',
            fontSize: 18,
            paddingBottom: 40,
        },
        blurContainer: {
            ...StyleSheet.absoluteFillObject,
            borderRadius: 13,
            overflow: 'hidden',
            backgroundColor: theme.TRANSPARENT_BACKGROUND,
        },
        loginText: {
            color: theme.TEXT,
        },
        noAccount: {
            marginTop: 20,
            alignItems: 'center',
        },

        noAccountText: {
            color: theme.TEXT,
        },
        registerBtn: {
            color: theme.SMALL_BUTTON_NO_BORDER,
        },
        image: {
            width: '90%',
            height: '100%',
            resizeMode: 'contain',
        },
        password: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '10%',
        },
        pass: {
            width: '100%',
        },
        errorText: {
            color: theme.ERROR,
            marginTop: 5,
        },
        styleLogIn: {
            marginTop: 25,
        },
        passwordMessage: {
            color: theme.ERROR,
            marginTop: 5,
            fontSize: 12,
        },
        errorBorder: {
            borderColor: theme.ERROR,
            borderWidth: 1,
        },
    });

export default createStyles;
