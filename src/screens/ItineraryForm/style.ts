import { Platform, StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';
import { FontTypes } from 'utils/const';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        containerView: {
            alignItems: 'center',
        },
        container: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
            paddingHorizontal: 10,
        },
        header: {
            paddingVertical: 50,
            alignItems: 'center',
            borderRadius: 15,
            width: '100%',
            marginTop: Platform.OS === 'ios' ? 20 : 40,
            height: 200,
        },
        title: {
            fontFamily: FontTypes.BOLD,
            fontSize: 32,
            color: theme.DROPDOWN_BACKGROUND,
        },
        formContainer: {
            marginTop: -45,
            width: '90%',
            padding: 20,
            backgroundColor: theme.OVERCARD_BACKGROUND,
            borderRadius: 15,
        },
        dateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: theme.OVERCARD_BACKGROUND,
            borderRadius: 8,
            borderColor: theme.BORDER_COLOR,
            borderWidth: 1,
            padding: 12,
            alignItems: 'center',
            marginBottom: 5,
        },
        datePicker: {
            flex: 1,
            marginHorizontal: 5,
        },
        destinationRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
        },
        text: {
            color: theme.TEXT,
            fontSize: 15,
            marginBottom: 5,
            marginTop: 15,
        },
        line: {
            color: theme.TEXT,
            fontSize: 16,
        },
        lineWhiteOpacity: {
            color: theme.BORDER_COLOR,
            fontSize: 16,
        },
        input: {
            fontSize: 18,
            width: '60%',
        },
        destinationInput: {
            fontSize: 18,
            width: '100%',
        },
        buttonStyle: {
            width: '35%',
        },
        cityListItem: {
            fontSize: 16,
            padding: 10,
            color: theme.TEXT,
        },
        descriptionInput: {
            height: 150,
            fontSize: 18,
            width: '100%',
            marginTop: 10,
            marginBottom: 20,
        },
        scrollView: {
            padding: 10,
            fontSize: 18,
            height: 50,
        },
        destinationTest: {
            fontSize: 18,
            marginBottom: 10,
            padding: 10,
            color: theme.TEXT,
        },
        modalView: {
            margin: 20,
            backgroundColor: theme.BACKGROUND,
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            marginTop: 22,
            backgroundColor: theme.BORDER_COLOR,
        },
        reviewTitle: {
            fontFamily: FontTypes.BOLD,
            fontSize: 24,
            color: theme.TEXT,
        },
        reviewText: {
            color: theme.TEXT,
            fontSize: 22,
            marginBottom: 5,
            marginTop: 5,
        },
        reviewInput: {
            height: 50,
            fontSize: 18,
            width: '90%',
            marginTop: 30,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignItems: 'center',
        },
        errorInput: {
            borderColor: theme.ERROR,
            fontSize: 18,
            width: '60%',
        },
        errorDestinationInput: {
            borderColor: theme.ERROR,
            fontSize: 18,
            width: '100%',
        },
        errorText: {
            fontSize: 11,
            color: theme.ERROR,
            marginStart: 2,
            marginTop: 2,
        },
        errorDateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: theme.BACKGROUND,
            borderRadius: 5,
            borderColor: theme.ERROR,
            borderWidth: 2,
            padding: 10,
            alignItems: 'center',
        },
    });

export default createStyles;
