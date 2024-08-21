import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dark_Theme, Light_Theme, Theme } from 'utils/colors';

interface ThemeContextProps {
    isDarkMode: boolean;
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme) {
                    setIsDarkMode(savedTheme === 'dark');
                }
            } catch (error) {
                Alert.alert('Failed to load from async');
            }
        };
        loadTheme();
    }, []);
    const toggleTheme = useCallback(async () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);

        try {
            await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (error) {
            Alert.alert('Error');
        }
    }, [isDarkMode]);

    const theme = useMemo(
        () => ({
            isDarkMode,
            theme: isDarkMode ? Light_Theme : Dark_Theme,
            toggleTheme,
        }),
        [isDarkMode, toggleTheme],
    );

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
