import { Platform, StyleSheet } from 'react-native';

import { SCREEN_WIDTH } from 'utils/const';

import { Theme } from '../../utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        mainContent: {
            flex: 1,
            backgroundColor: theme.BACKGROUND,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 40,
            paddingHorizontal: 20,
        },
        gradient: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 24,
        },
        profile: {
            width: SCREEN_WIDTH - 40,
            height: 300,
            borderRadius: 24,
            opacity: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? 0 : 20,
        },
        userProfile: {
            width: SCREEN_WIDTH - 40,
            height: 300,
            borderRadius: 24,
            opacity: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
        },
        profileSecond: {
            marginTop: 40,
            width: SCREEN_WIDTH - 40,
            height: 300,
            borderRadius: 24,
            opacity: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
        },
        name: {
            width: '100%',
            fontSize: 18,
            color: theme.DROPDOWN_BACKGROUND,
            marginBottom: 10,
            textAlign: 'center',
            minHeight: 30,
            padding: 15,
        },
        followButton: {
            borderRadius: 24,
            borderWidth: 1,
            borderColor: theme.DEFAULT_BUTTON_BORDER,
            backgroundColor: theme.DEFAULT_BUTTON_COLOR,
            paddingVertical: 10,
            paddingHorizontal: 20,
            opacity: 1,
        },
        followButtonText: {
            opacity: 1,
            color: theme.DROPDOWN_BACKGROUND,
            fontSize: 16,
            fontWeight: '400',
            letterSpacing: 0,
            textAlign: 'center',
        },
        titleName: {
            fontSize: 18,
            color: theme.TEXT,
            textAlign: 'left',
            width: '100%',
            padding: 10,
        },
        descriptionName: {
            width: '100%',
            fontSize: 18,
            color: theme.TEXT,
            textAlign: 'auto',
            minHeight: 30,
            padding: 10,
        },
        showFollower: {
            position: 'absolute',
            bottom: -120,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            paddingHorizontal: 10,
        },
        itinerariesButton: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
            alignItems: 'center',
            paddingHorizontal: 15,
        },
        textViewAll: {
            fontWeight: 'bold',
            fontSize: 14,
            color: theme.SMALL_BUTTON_NO_BORDER,
        },
        readOnlyInput: {
            height: 150,
            borderColor: theme.BORDER_COLOR,
            borderWidth: 1,
            padding: 10,
            textAlignVertical: 'top',
            flex: 1,
        },
        editableTextInput: {
            width: '100%',
            borderColor: theme.BORDER_COLOR,
            borderWidth: 2,
            minHeight: 30,
            borderRadius: 10,
        },
        editableNameInput: {
            width: '50%',
            borderColor: theme.BORDER_COLOR,
            borderWidth: 2,
            minHeight: 30,
            borderRadius: 10,
        },
        avatarContainer: {
            position: 'relative',
            alignItems: 'center',
        },
        avatarEditButton: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: theme.OVERCARD_BACKGROUND,
            borderRadius: 50,
            padding: 10,
        },
        flatListContainer: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        cardContainer: {
            width: SCREEN_WIDTH * 0.8,
            height: '100%',
        },
    });

export default createStyles;
