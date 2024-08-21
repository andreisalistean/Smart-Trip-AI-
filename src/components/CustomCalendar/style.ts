import { StyleSheet } from 'react-native';

import { Colors, Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        viewOutsideData: {
            width: `${100 / 10}%`,
            padding: 5,
            alignItems: 'center',
            borderRadius: 50,
            margin: 10,
        },
        selectedCurentDay: {
            color: Colors.BLACK,
        },
        viewSelectedDate: {
            width: `${100 / 10}%`,
            backgroundColor: theme.SMALL_BUTTON_NO_BORDER,
            padding: 5,
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
        },
        viewDate: {
            width: `${100 / 10}%`,
            backgroundColor: Colors.SOFT_BLACK,
            padding: 5,
            alignItems: 'center',
            borderRadius: 20,
            margin: 10,
        },
        dateOutsideNumber: {
            color: 'white',
        },
        dateCurentNumber: {
            color: Colors.MAGENTA,
        },
        dateNumber: {
            color: 'white',
        },
        styleColumn: {
            display: 'flex',
            flexDirection: 'column',
        },
        styleRow: {
            backgroundColor: 'pink',
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
        },
        styleTitle: {
            backgroundColor: Colors.PINK,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        styleYear: {
            backgroundColor: Colors.PINK,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderStartStartRadius: 15,
            borderTopEndRadius: 15,
        },
        styleImg: {
            margin: 10,
            width: 20,
            height: 20,
            resizeMode: 'contain',
        },
        container: {
            width: '95%',
            flex: 1,
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'space-around',
        },
        imgLeft: {
            left: 10,
        },
        imgRight: {
            right: 10,
        },
        styleWeekDays: {
            backgroundColor: Colors.PINK,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        styleDays: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        styleTitleList: {
            textAlign: 'center',
            fontSize: 18,
            padding: 4,
            color: Colors.PINK,
        },
        cardActivity: {
            backgroundColor: Colors.DARK_PURPLE,
            borderRadius: 20,
            padding: 10,
            margin: 5,
        },
        viewDescription: {
            margin: 10,
        },
        titleDescription: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.LIGHT_PURPLE,
        },
        locationView: {
            margin: 10,
        },
        titleLocation: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.LIGHT_PURPLE,
        },
        textDescription: {
            color: theme.TEXT,
        },
        textLocation: {
            color: theme.TEXT,
        },
    });

export default createStyles;
