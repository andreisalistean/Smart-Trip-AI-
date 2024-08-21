import React, { useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'components/Text';
import UserCard from 'components/UserCard';
import { useTheme } from 'context/ThemeContext';
import useFetchUserData from 'hooks/useFetchUserData';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import useTranslate from 'translations/useTranslate';

import createStyles from './style';

type FollowersOrFollowingProps = {
    params: {
        usersIds: string[];
        followers: boolean;
    };
};

type FollowersOfFollowingNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.PROFILE_SCREEN
>;

export const FollowersOrFollowingScreen = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const t = useTranslate();
    const { getUsers, users } = useFetchUserData();
    const route = useRoute<RouteProp<FollowersOrFollowingProps, 'params'>>();
    const usersIds = route.params.usersIds;
    const followers = route.params.followers;
    const navigation = useNavigation<FollowersOfFollowingNavigationProp>();

    useEffect(() => {
        getUsers(usersIds);
    }, [getUsers, usersIds]);

    const renderUsers = useCallback(() => {
        return users.map((user) => (
            <UserCard
                key={user.id}
                item={user}
                onPress={() => {
                    navigation.navigate(ROUTE_KEYS.PROFILE_SCREEN, {
                        userId: user.id,
                        isProfileScreen: false,
                    });
                }}
            />
        ));
    }, [navigation, users]);

    return (
        <ScrollView style={styles.mainContent}>
            <View style={styles.containerView}>
                {!followers && (
                    <Text style={styles.title}>
                        {t('followersOrFollowingScreen.following')}
                    </Text>
                )}
                {followers && (
                    <Text style={styles.title}>
                        {t('followersOrFollowingScreen.followers')}
                    </Text>
                )}
                {renderUsers()}
            </View>
        </ScrollView>
    );
};
