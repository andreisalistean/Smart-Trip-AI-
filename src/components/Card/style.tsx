import { StyleSheet } from 'react-native';

import { Colors, Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        card: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: theme.OVERCARD_BACKGROUND,
            height: 330,
            borderRadius: 20,
            margin: 10,
            elevation: 3,
            padding: 16,
        },
        icons: {
            color: Colors.MAGENTA,
        },
        image: {
            width: '100%',
            backgroundColor: Colors.WHITE,
            borderRadius: 20,
            marginBottom: 16,
            height: 200,
        },
        description: {
            color: theme.TEXT,
            marginLeft: 10,
            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 25,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        location: {
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        locationText: {
            marginLeft: 5,
            color: theme.TEXT,
        },
        rating: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
            marginTop: 4,
        },
        ratingText: {
            marginLeft: 5,
            color: theme.TEXT,
        },
        info: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonstyle: {
            backgroundColor: Colors.MAGENTA,
            height: 40,
            width: 300,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
            margin: 'auto',
            marginTop: 20,
        },
        view: {
            height: '35%',
        },
    });
export default createStyles;
