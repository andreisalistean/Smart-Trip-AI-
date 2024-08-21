import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from 'context/ThemeContext';
import { useFonts } from 'expo-font';
import MainNavigator from 'navigation/MainNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from 'store';
import { changeLanguage } from 'translations/i18n';

import { FONT_MAPPING } from './src/utils/utils';

export default function App() {
    const [loaded] = useFonts(FONT_MAPPING);

    useEffect(() => {
        const getLanguage = async () => {
            const lng = await AsyncStorage.getItem('selectedLanguage');
            if (lng) {
                changeLanguage(lng);
            }
        };
        getLanguage();
    }, []);

    if (!loaded) {
        return null;
    }
    return (
        <Provider store={store}>
            <ThemeProvider>
                <GestureHandlerRootView>
                    <MainNavigator />
                </GestureHandlerRootView>
            </ThemeProvider>
        </Provider>
    );
}
