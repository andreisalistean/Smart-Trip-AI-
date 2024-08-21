import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from 'context/ThemeContext';

import createStyles from './styles';

const LoadingScreen = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.loadingScreen}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.TEXT} />
            </View>
        </View>
    );
};

export default LoadingScreen;
