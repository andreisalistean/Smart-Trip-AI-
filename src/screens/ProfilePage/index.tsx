import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import CardComponent from 'components/Card';
import ChatBot from 'components/ChatBot';
import CustomCalendar from 'components/CustomCalendar';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { onValue, ref, update } from 'firebase/database';
import useFetchUserData from 'hooks/useFetchUserData';
import useFollowUser from 'hooks/useFollowUser';
import usePhoto from 'hooks/usePhoto';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { actions } from 'store/reducers/userDataReducer';
import { TripData } from 'store/types';
import { UserData } from 'store/types';
import useTranslate from 'translations/useTranslate';
import { Colors } from 'utils/colors';
import { Trip } from 'utils/types';
import { GRADIENT_STYLES, renderIcon } from 'utils/utils';

import ShowFollower from './components/ShowFollower';
import createStyles from './styles';
import { database } from '../../../firebaseConfig';
import Camera from '../../assets/svgs/camera.svg';
import Edit from '../../assets/svgs/edit.svg';
import Save from '../../assets/svgs/save.svg';
import Share from '../../assets/svgs/share.svg';

type ProfilePageProps = {
    params: {
        userId: string;
        isProfileScreen: boolean;
    };
};

const ProfilePage = () => {
    const t = useTranslate();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const dispatch = useDispatch();
    const route = useRoute<RouteProp<ProfilePageProps, 'params'>>();
    const userId = route.params.userId;
    const { isProfileScreen } = route.params;
    const { fetchUserData, user } = useFetchUserData();
    const [newUser, setNewUser] = useState<UserData>({
        id: '',
        userName: '',
        avatar: '',
        userDescription: '',
        userTrips: [],
        followers: [],
        following: [],
        userEmail: '',
    });

    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );
    const { followUser, unfollowUser } = useFollowUser(userData.id, user.id);

    useEffect(() => {
        fetchUserData(userId, isProfileScreen);
    }, [fetchUserData, isProfileScreen, userId]);

    useEffect(() => {
        if (userData.id) {
            const userRef = ref(database, '/users/' + userData.id);
            const unsubscribe = onValue(userRef, (snapshot) => {
                if (snapshot && snapshot.exists()) {
                    const newUserData = snapshot.val();
                    const newData: UserData = {
                        id: userData.id,
                        userName: newUserData.userName,
                        avatar: newUserData.avatar,
                        userDescription: newUserData.userDescription,
                        userTrips: newUserData.userTrips,
                        followers: newUserData.followers,
                        following: newUserData.following,
                        userEmail: newUserData.userEmail,
                    };
                    setNewUser(newData);
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [userData.id]);

    const [descriptionText, setDescriptionText] = useState<string>(
        user.userDescription,
    );
    const [nameText, setNameText] = useState(user.userName);
    const [isEditable, setIsEditable] = useState(false);
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        setNameText(user.userName);
        setDescriptionText(user.userDescription);
    }, [user]);

    const { pickImage } = usePhoto(
        user.avatar,
        user.id,
        actions.updateAccount,
        'avatars',
        'users',
        'avatar',
    );

    const toggleEditable = useCallback(() => {
        setIsEditable((prevState) => !prevState);
    }, []);

    const nameInputStyle = useMemo(
        () => [styles.name, isEditable && styles.editableNameInput],
        [isEditable, styles.editableNameInput, styles.name],
    );

    const descriptionInputStyle = useMemo(
        () => [styles.descriptionName, isEditable && styles.editableTextInput],
        [isEditable, styles.descriptionName, styles.editableTextInput],
    );

    const displayImage = useMemo(() => {
        return user.avatar
            ? { uri: user.avatar }
            : require('../../assets/images/default_profile.jpg');
    }, [user.avatar]);

    const iconName = useMemo(() => {
        return isEditable
            ? renderIcon(<Save />, 25, 'white')
            : renderIcon(<Edit />, 25, 'white');
    }, [isEditable]);

    const gradientColors = useMemo(
        () => [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND],
        [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND],
    );

    const isFollowing = useCallback(() => {
        return newUser.following.includes(user.id);
    }, [user.id, newUser]);

    const saveChanges = useCallback(async () => {
        if (isEditable) {
            try {
                const userRef = ref(database, `users/${userData.id}`);
                await update(userRef, {
                    userName: nameText,
                    userDescription: descriptionText,
                });
                dispatch(
                    actions.updateAccount({
                        userName: nameText,
                        userDescription: descriptionText,
                    }),
                );
            } catch (error) {
                Alert.alert(t('profilePage.errorUpdating'));
            }
        }
        setIsEditable(false);
    }, [descriptionText, nameText, isEditable, userData.id, dispatch, t]);

    const navigation =
        useNavigation<NavigationProp<MainNavigatorStackParamList>>();
    useEffect(() => {
        setTrips(userData.userTrips);
    }, [userData]);

    const handleOnPressItineraryCard = useCallback(
        (
            item: TripData,
            isRecommendation: boolean,
            navigatedFromProfile: boolean,
        ) =>
            navigation.navigate(ROUTE_KEYS.DETAIL_SCREEN, {
                trip: item,
                isRecommendation: isRecommendation,
                navigatedFromProfile: navigatedFromProfile,
            }),
        [navigation],
    );
    const renderItem = useCallback(
        ({ item }: { item: TripData }) => {
            return (
                <View style={styles.cardContainer}>
                    <CardComponent
                        item={item}
                        onPress={() =>
                            handleOnPressItineraryCard(item, false, true)
                        }
                    />
                </View>
            );
        },
        [handleOnPressItineraryCard, styles.cardContainer],
    );

    const keyExtractor = useCallback((item: Trip) => item.id, []);

    return (
        <View style={styles.mainContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={
                        isProfileScreen ? styles.profile : styles.userProfile
                    }
                >
                    <LinearGradient
                        colors={gradientColors}
                        style={styles.gradient}
                        start={GRADIENT_STYLES.start}
                        end={GRADIENT_STYLES.end}
                    />
                    <View style={styles.avatarContainer}>
                        <Image source={displayImage} style={styles.avatar} />
                        {isProfileScreen && (
                            <TouchableOpacity
                                style={styles.avatarEditButton}
                                onPress={pickImage}
                            >
                                {renderIcon(<Camera />, 25, Colors.WHITE)}
                            </TouchableOpacity>
                        )}
                    </View>
                    <TextInput
                        style={nameInputStyle}
                        value={nameText}
                        onChangeText={setNameText}
                        editable={isEditable}
                        multiline={true}
                        maxLength={20}
                        placeholder={t('profilePage.usernamePlaceholder')}
                        placeholderTextColor={theme.PLACEHOLDER_TEXT}
                    />
                    <View style={styles.buttonContainer}>
                        {!isProfileScreen && (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={
                                    isFollowing() ? unfollowUser : followUser
                                }
                            >
                                <Text style={styles.followButtonText}>
                                    {isFollowing()
                                        ? t('profilePage.unfollow')
                                        : t('profilePage.follow')}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {isProfileScreen && (
                            <TouchableOpacity
                                style={styles.followButton}
                                onPress={
                                    isEditable ? saveChanges : toggleEditable
                                }
                            >
                                {iconName}
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.followButton}>
                            {renderIcon(<Share />, 25, 'white')}
                        </TouchableOpacity>
                    </View>
                    <ShowFollower userData={user} />
                </View>

                <View style={styles.profileSecond}>
                    {isProfileScreen && (
                        <Text style={styles.titleName}>
                            {t('profilePage.aboutMe')}
                        </Text>
                    )}
                    <TextInput
                        style={descriptionInputStyle}
                        value={descriptionText}
                        onChangeText={setDescriptionText}
                        editable={isEditable}
                        multiline={true}
                        maxLength={200}
                        placeholder={
                            isProfileScreen
                                ? t('profilePage.descriptionPlaceholder')
                                : ''
                        }
                        placeholderTextColor={Colors.WHITE_OPACITY_10}
                    />

                    <View style={styles.itinerariesButton}>
                        <Text style={styles.titleName}>
                            {isProfileScreen
                                ? t('profilePage.myItineraries')
                                : t('profilePage.itineraries')}
                        </Text>
                    </View>
                </View>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={trips}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {isProfileScreen && (
                    <CustomCalendar trips={trips}></CustomCalendar>
                )}
            </ScrollView>
            <ChatBot />
        </View>
    );
};

export default ProfilePage;
