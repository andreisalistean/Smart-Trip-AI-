import React, { useCallback, useMemo, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogin } from 'hooks/useLogin';
import LoadingScreen from 'screens/LoadingScreen';
import useTranslate from 'translations/useTranslate';
import { GRADIENT_COLORS, GRADIENT_STYLES } from 'utils/utils';

import createStyles from './styles';
import CustomGradientButton from '../../components/CustomGradientButton';
import CustomTextInput from '../../components/CustomTextInput';
import { MainNavigatorStackParamList } from '../../navigation/MainNavigator';
import { ROUTE_KEYS } from '../../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.LOGIN_SCREEN
>;

const LoginScreen = () => {
    const { login, loading } = useLogin();
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const t = useTranslate();
    const { theme, isDarkMode } = useTheme();
    const styles = createStyles(theme);

    const handlePress = useCallback(() => {
        navigation.navigate(ROUTE_KEYS.REGISTER_SCREEN);
    }, [navigation]);

    const blurTint = isDarkMode ? 'systemChromeMaterialLight' : 'dark';
    const gradientColors = useMemo(
        () => [GRADIENT_COLORS.first, GRADIENT_COLORS.second],
        [],
    );

    const handleLogin = useCallback(async () => {
        const success = await login(email, password);
        switch (success) {
            case 0:
                navigation.replace(ROUTE_KEYS.TAB_NAVIGATOR);
                break;
            case 1:
                Alert.alert(t('errors.default'), t('errors.1'));
                break;
            case 2:
                Alert.alert(t('errors.default'), t('errors.2'));
                break;
            case 3:
                Alert.alert(t('errors.default'), t('errors.3'));
                break;
            case 4:
                Alert.alert(t('errors.default'), t('errors.4'));
                break;
            default:
                break;
        }
    }, [login, email, password, navigation, t]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={gradientColors}
                start={GRADIENT_STYLES.start}
                end={GRADIENT_STYLES.end}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.text}>{t('welcome')}</Text>
                </View>
            </LinearGradient>

            <View style={styles.formContainer}>
                <BlurView
                    intensity={100}
                    tint={blurTint}
                    style={styles.blurContainer}
                />

                <Text style={styles.loginTitle}>{t('loginTitle')}</Text>
                <Text style={styles.labelText}>{t('emailLabel')}</Text>
                <CustomTextInput
                    onChangeText={onChangeEmail}
                    text={email}
                    placeholder={t('emailLabel')}
                    secureTextEntry={false}
                ></CustomTextInput>

                <Text style={styles.labelTextPass}>{t('passwordLabel')}</Text>
                <View style={styles.password}>
                    <CustomTextInput
                        style={styles.pass}
                        onChangeText={onChangePassword}
                        text={password}
                        placeholder={t('passwordLabel')}
                        isPassword
                    ></CustomTextInput>
                </View>

                <View style={styles.styleLogIn}>
                    <CustomGradientButton
                        text={t('logInButton')}
                        colorStart={theme.GRADIENT_FIRST}
                        colorEnd={theme.GRADIENT_SECOND}
                        onClick={handleLogin}
                    />
                </View>
                <View style={styles.noAccount}>
                    <Text style={styles.noAccountText}>
                        {t('noAccountText')}
                    </Text>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.registerBtn}>
                            {t('registerButton')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
