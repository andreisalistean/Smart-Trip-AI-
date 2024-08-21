import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';
import { SCREEN_WIDTH } from 'utils/const';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        gradientFullView: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            borderRadius: 0,
            padding: 0,
            margin: 0,
        },
        mapContainerFullView: {
            borderRadius: 0,
        },
        autocompleteContainer: {
            position: 'absolute',
            top: '5%',
            width: SCREEN_WIDTH * 0.9,
            alignSelf: 'center',
            zIndex: 1,
            overflow: 'visible',
        },
        textInputContainer: {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            top: '5%',
            width: '100%',
            alignSelf: 'center',
        },
        textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: '100%',
            color: theme.TEXT,
            fontSize: 16,
            padding: 10,
            borderRadius: 30,
            borderColor: theme.BORDER_COLOR,
            borderWidth: 3,
            paddingHorizontal: 10,
        },
        predefinedPlacesDescription: {
            color: 'green',
        },
        listView: {
            top: '10%',
            backgroundColor: theme.BACKGROUND,
            width: '100%',
            borderRadius: 15,
            padding: 10,
            overflow: 'hidden',
        },
        separator: {
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: theme.TEXT,
        },
        description: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            fontSize: 6,
            maxWidth: '90%',
        },
        listItem: {
            paddingHorizontal: 10,
            borderRadius: 10,
        },
        itemText: {
            fontSize: 14,
            color: theme.TEXT,
        },
    });

export default createStyles;
