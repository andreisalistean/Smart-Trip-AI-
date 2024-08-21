import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'components/Text';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { UserData } from 'store/types';
import useTranslate from 'translations/useTranslate';

import { styles } from './styles';

type ProfileScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.FOLLOWERS_OR_FOLLOWING_SCREEN
>;

const ShowFollower = ({ userData }: { userData: UserData }) => {
    const t = useTranslate();

    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const fetchFollowedOrFollowingUsers = useCallback(
        (usersIds: string[], followers: boolean) => {
            navigation.navigate(ROUTE_KEYS.FOLLOWERS_OR_FOLLOWING_SCREEN, {
                usersIds: usersIds,
                followers: followers,
            });
        },
        [navigation],
    );

    const onFollowPress = useCallback(
        (users: string[], isFollower: boolean) => {
            fetchFollowedOrFollowingUsers(users, isFollower);
        },
        [fetchFollowedOrFollowingUsers],
    );

    return (
        <View style={styles.content}>
            <View>
                <Text style={styles.titleName}>
                    {userData?.userTrips?.length}
                </Text>
                <Text style={styles.titleName}>{t('showFollower.posts')}</Text>
            </View>
            <TouchableOpacity
                onPress={() => onFollowPress(userData.followers, true)}
            >
                <Text style={styles.titleName}>
                    {userData?.followers?.length}
                </Text>
                <Text style={styles.titleName}>
                    {t('showFollower.followers')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    onFollowPress(userData.following, false);
                }}
            >
                <Text style={styles.titleName}>
                    {userData?.following?.length}
                </Text>
                <Text style={styles.titleName}>
                    {t('showFollower.following')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShowFollower;
