import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'context/ThemeContext';
import useFetchUserData from 'hooks/useFetchUserData';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';

import createStyles from './styles';

type SplashScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.SPLASH_SCREEN
>;

const SplashScreen = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const navigation = useNavigation<SplashScreenNavigationProp>();
    const { fetchUserData } = useFetchUserData();
    useEffect(() => {
        const verifyIfLoggedIn = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('userData');
                if (jsonValue) fetchUserData(jsonValue, true);
                setTimeout(() => {
                    if (jsonValue != null) {
                        navigation.replace(ROUTE_KEYS.TAB_NAVIGATOR);
                    } else {
                        navigation.replace(ROUTE_KEYS.LOGIN_SCREEN);
                    }
                }, 1000);
            } catch (e) {
                navigation.replace(ROUTE_KEYS.LOGIN_SCREEN);
            }
        };

        verifyIfLoggedIn();
    }, [fetchUserData, navigation]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/new_logo.png')}
            ></Image>
        </View>
    );
};

export default SplashScreen;
