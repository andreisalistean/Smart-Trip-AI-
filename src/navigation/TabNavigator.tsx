import * as React from 'react';
import { useMemo } from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'context/ThemeContext';
import { useSelector } from 'react-redux';
import ItineraryForm from 'screens/ItineraryForm';
import ItineraryList from 'screens/ItineraryList';
import MapScreen from 'screens/MapScreen';
import ProfilePage from 'screens/ProfilePage';
import SearchScreen from 'screens/SearchScreen';
import { RootState } from 'store';
import { Colors } from 'utils/colors';
import { renderIcon } from 'utils/utils';

import CustomHeader from './CustomHeader';
import createStyles from './style';
import useTabBarOptions from './tabBarOptions';
import { ROUTE_KEYS } from './types';
import Add from '../assets/svgs/add.svg';
import Home from '../assets/svgs/home.svg';
import MapIcon from '../assets/svgs/map.svg';
import Search from '../assets/svgs/search.svg';

export type TabNavigatorParamList = {
    [ROUTE_KEYS.MAP_SCREEN]: undefined;
    [ROUTE_KEYS.SEARCH_SCREEN]: undefined;
    [ROUTE_KEYS.HOME_SCREEN]: undefined;
    [ROUTE_KEYS.PROFILE_SCREEN]: { userId: string; isProfileScreen: boolean };
    [ROUTE_KEYS.ITINERARY_FORM_SCREEN]: undefined;
    [ROUTE_KEYS.CHATBOT_SCREEN]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabNavigator() {
    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );

    const avatarSource = useMemo(() => {
        return userData.avatar
            ? { uri: userData.avatar }
            : require('../assets/images/default_profile.jpg');
    }, [userData.avatar]);

    const tabBarOptions = useTabBarOptions();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    return (
        <Tab.Navigator
            initialRouteName={ROUTE_KEYS.HOME_SCREEN}
            screenOptions={{
                ...tabBarOptions,
                header: () => {
                    return <CustomHeader></CustomHeader>;
                },
            }}
        >
            <Tab.Screen
                name={ROUTE_KEYS.HOME_SCREEN}
                component={ItineraryList}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return renderIcon(
                            <Home />,
                            25,
                            Colors.SOFT_BLACK,
                            Colors.LIGHT_PURPLE,
                            focused,
                        );
                    },
                }}
            />

            <Tab.Screen
                name={ROUTE_KEYS.SEARCH_SCREEN}
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return renderIcon(
                            <Search />,
                            25,
                            Colors.SOFT_BLACK,
                            Colors.LIGHT_PURPLE,
                            focused,
                        );
                    },
                }}
            />

            <Tab.Screen
                name={ROUTE_KEYS.ITINERARY_FORM_SCREEN}
                component={ItineraryForm}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return renderIcon(
                            <Add />,
                            25,
                            Colors.SOFT_BLACK,
                            Colors.LIGHT_PURPLE,
                            focused,
                        );
                    },
                }}
            />

            <Tab.Screen
                name={ROUTE_KEYS.MAP_SCREEN}
                component={MapScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return renderIcon(
                            <MapIcon />,
                            25,
                            Colors.SOFT_BLACK,
                            Colors.LIGHT_PURPLE,
                            focused,
                        );
                    },
                }}
            />

            <Tab.Screen
                name={ROUTE_KEYS.PROFILE_SCREEN}
                component={ProfilePage}
                initialParams={{ userId: userData.id, isProfileScreen: true }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={avatarSource}
                                style={[
                                    styles.profileImage,
                                    focused && styles.focusedImage,
                                ]}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
