import React, { useCallback, useMemo } from 'react';
import {
    StyleProp,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from 'context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import Icon from 'react-native-vector-icons/Entypo';

import createStyles from './styles';

type ChatBotProps = {
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
};

const ChatBot: React.FC<ChatBotProps> = ({ buttonStyle }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    type ChatBotScreenNavigationProp = StackNavigationProp<
        MainNavigatorStackParamList,
        typeof ROUTE_KEYS.CHATBOT_SCREEN
    >;
    const navigation = useNavigation<ChatBotScreenNavigationProp>();

    const handleNavigate = useCallback(() => {
        navigation.navigate(ROUTE_KEYS.CHATBOT_SCREEN);
    }, [navigation]);

    const gradientColors = useMemo(
        () => [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND],
        [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND],
    );

    const combinedButtonStyle = useMemo(
        () => [styles.button, buttonStyle],
        [buttonStyle, styles.button],
    );

    return (
        <TouchableOpacity style={combinedButtonStyle} onPress={handleNavigate}>
            <LinearGradient colors={gradientColors} style={combinedButtonStyle}>
                <Icon name="chat" color={theme.DROPDOWN_BACKGROUND} size={20} />
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default ChatBot;
