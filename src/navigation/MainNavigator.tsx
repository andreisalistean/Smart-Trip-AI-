import * as React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'context/ThemeContext';
import BudgetPlanningScreen from 'screens/BudgetPlanningScreen';
import ChatBotScreen from 'screens/ChatBotScreen';
import { FollowersOrFollowingScreen } from 'screens/FollowersOrFollowingScreen';
import ItineraryDetailScreen from 'screens/ItineraryDetailScreen';
import LoginScreen from 'screens/LoginScreen';
import ProfilePage from 'screens/ProfilePage';
import RecommendationScreen from 'screens/RecommendationScreen';
import RegistrationScreen from 'screens/RegistrationScreen';
import SettingsScreen from 'screens/SettingsScreen';
import SplashScreen from 'screens/SplashScreen';
import { TripData } from 'store/types';

import TabNavigator from './TabNavigator';
import { ROUTE_KEYS } from './types';

export type MainNavigatorStackParamList = {
    [ROUTE_KEYS.SPLASH_SCREEN]: undefined;
    [ROUTE_KEYS.TAB_NAVIGATOR]: undefined;
    [ROUTE_KEYS.LOGIN_SCREEN]: undefined;
    [ROUTE_KEYS.REGISTER_SCREEN]: undefined;
    [ROUTE_KEYS.PROFILE_SCREEN]: { userId: string; isProfileScreen: boolean };
    [ROUTE_KEYS.DETAIL_SCREEN]: {
        trip: TripData;
        isRecommendation: boolean;
        navigatedFromProfile: boolean;
    };
    [ROUTE_KEYS.RECOMMENDATION_SCREEN]: { trips: TripData[] };
    [ROUTE_KEYS.CHATBOT_SCREEN]: undefined;
    [ROUTE_KEYS.SETTINGS_SCREEN]: undefined;
    [ROUTE_KEYS.BUDGET_PLANNING_SCREEN]: { tripID: number };
    [ROUTE_KEYS.FOLLOWERS_OR_FOLLOWING_SCREEN]: {
        usersIds: string[];
        followers: boolean;
    };
};

const Stack = createNativeStackNavigator<MainNavigatorStackParamList>();

function MainNavigator() {
    const { isDarkMode } = useTheme();
    const statusBarStyle = isDarkMode ? 'dark-content' : 'light-content';

    return (
        <>
            <StatusBar
                barStyle={statusBarStyle}
                backgroundColor="transparent"
                translucent
            />

            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={ROUTE_KEYS.SPLASH_SCREEN}
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen
                        name={ROUTE_KEYS.SPLASH_SCREEN}
                        component={SplashScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.TAB_NAVIGATOR}
                        component={TabNavigator}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.LOGIN_SCREEN}
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.REGISTER_SCREEN}
                        component={RegistrationScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.PROFILE_SCREEN}
                        component={ProfilePage}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.DETAIL_SCREEN}
                        component={ItineraryDetailScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.RECOMMENDATION_SCREEN}
                        component={RecommendationScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.CHATBOT_SCREEN}
                        component={ChatBotScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.SETTINGS_SCREEN}
                        component={SettingsScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.BUDGET_PLANNING_SCREEN}
                        component={BudgetPlanningScreen}
                    />
                    <Stack.Screen
                        name={ROUTE_KEYS.FOLLOWERS_OR_FOLLOWING_SCREEN}
                        component={FollowersOrFollowingScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
export default MainNavigator;
