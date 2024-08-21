import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { Alert, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomGradientButton from 'components/CustomGradientButton';
import CustomTextInput from 'components/CustomTextInput';
import { useTheme } from 'context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import useRegistration from 'hooks/useRegistration';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import LoadingScreen from 'screens/LoadingScreen';
import useTranslate from 'translations/useTranslate';

import createStyles from './style';
import CheckBox from '../../components/CustomCheckBox/index';
import { Text } from '../../components/Text/index';
import { GRADIENT_STYLES, validEmail, validPassword } from '../../utils/utils';

type RegisterScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.REGISTER_SCREEN
>;

const RegistrationScreen = () => {
    const t = useTranslate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [checked, setChecked] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');
    const { theme, isDarkMode } = useTheme();
    const styles = createStyles(theme);
    const gradientColors = useMemo(
        () => [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND],
        [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND],
    );
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const blurTint = isDarkMode ? 'systemChromeMaterialLight' : 'dark';
    const handlePress = useCallback(() => {
        navigation.navigate(ROUTE_KEYS.LOGIN_SCREEN);
    }, [navigation]);

    const { handleRegistatration, loading } = useRegistration();

    const register = useCallback(() => {
        if (name === '' || email === '' || password === '' || confirm === '') {
            Alert.alert(
                t('registrationScreen.alerts.error'),
                t('registrationScreen.messages.fillFields'),
            );
            return;
        }
        if (!validEmail.test(email)) {
            Alert.alert(
                t('registrationScreen.alerts.oops'),
                t('registrationScreen.messages.validEmail'),
            );
            return;
        }
        if (!validPassword.test(password)) {
            Alert.alert(
                t('registrationScreen.alerts.oops'),
                t('registrationScreen.messages.validPassword'),
            );
            return;
        }
        if (!checked) {
            Alert.alert(
                t('registrationScreen.alerts.error'),
                t('registrationScreen.messages.acceptTerms'),
            );
            return;
        }

        if (password === confirm) {
            try {
                handleRegistatration(name, email, password);
            } catch (error) {
                Alert.alert(
                    t('registrationScreen.alerts.error'),
                    t('registrationScreen.messages.registrationError'),
                );
            }
        } else
            Alert.alert(
                t('registrationScreen.alerts.oops'),
                t('registrationScreen.messages.passwordMismatch'),
            );
    }, [checked, confirm, email, handleRegistatration, name, password, t]);

    const handleChange = useCallback(
        (
            text: string,
            setter: (value: string) => void,
            validator: (value: string) => {
                message: string;
                hasError: boolean;
            },
            setMessage: (value: string) => void,
            setError: (value: boolean) => void,
        ) => {
            setter(text);
            setIsTyping(!!text.length);
            const { message, hasError } = validator(text);
            setMessage(message);
            setError(hasError);
        },
        [],
    );

    const handlePasswordChange = useCallback(
        (text: string) => {
            const validatePassword = (password: string) => {
                let message = '';
                let hasError = false;
                if (password.length < 6) {
                    message = t('registrationScreen.messages.passwordError');
                    hasError = true;
                } else if (!/[A-Z]/.test(password)) {
                    message = t(
                        'registrationScreen.messages.passwordUppercase',
                    );
                    hasError = true;
                } else if (!/[a-z]/.test(password)) {
                    message = t(
                        'registrationScreen.messages.passwordLowercase',
                    );
                    hasError = true;
                } else if (!/[!@#$%^&*]/.test(password)) {
                    message = t(
                        'registrationScreen.messages.passwordSpecialCharacter',
                    );
                    hasError = true;
                }
                return { message, hasError };
            };

            handleChange(
                text,
                setPassword,
                validatePassword,
                setPasswordMessage,
                setPasswordError,
            );
        },
        [handleChange, t],
    );

    const handleConfirmPasswordChange = useCallback(
        (text: string) => {
            const validateConfirmPassword = (confirm: string) => {
                let message = '';
                let hasError = false;
                if (confirm !== password && confirm.length > 0) {
                    message = t(
                        'registrationScreen.messages.confirmPasswordError',
                    );
                    hasError = true;
                }
                return { message, hasError };
            };

            handleChange(
                text,
                setConfirm,
                validateConfirmPassword,
                setConfirmPasswordMessage,
                setConfirmPasswordError,
            );
        },
        [handleChange, password, t],
    );

    const handleEmailChange = useCallback(
        (text: string) => {
            const validateEmail = (email: string) => {
                let message = '';
                let hasError = false;
                if (!validEmail.test(email)) {
                    message = t('registrationScreen.messages.emailError');
                    hasError = true;
                }
                return { message, hasError };
            };

            handleChange(
                text,
                setEmail,
                validateEmail,
                setEmailMessage,
                setEmailError,
            );
        },
        [handleChange, t],
    );

    useEffect(() => {
        if (!isTyping) {
            setPasswordMessage('');
            setConfirmPasswordMessage('');
            setEmailMessage('');
            setPasswordError(false);
            setConfirmPasswordError(false);
            setEmailError(false);
        }
    }, [isTyping]);

    const useBaseStyle = useMemo(() => styles.pass, [styles.pass]);
    const useErrorStyle = useMemo(
        () => styles.errorBorder,
        [styles.errorBorder],
    );

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ScrollView style={styles.container} automaticallyAdjustKeyboardInsets>
            <LinearGradient
                colors={gradientColors}
                start={GRADIENT_STYLES.start}
                end={GRADIENT_STYLES.end}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.text}>
                        {t('registrationScreen.titles.welcome')}
                    </Text>
                </View>
            </LinearGradient>

            <View style={styles.formContainer}>
                <BlurView
                    intensity={100}
                    tint={blurTint}
                    style={styles.blurContainer}
                />

                <Text style={styles.loginTitle}>
                    {t('registrationScreen.titles.register')}
                </Text>
                <Text style={styles.labelText}>
                    {t('registrationScreen.labels.name')}
                </Text>

                <CustomTextInput
                    onChangeText={setName}
                    text={name}
                    placeholder={t('registrationScreen.placeholders.name')}
                />

                <Text style={styles.labelText}>
                    {t('registrationScreen.labels.email')}
                </Text>
                <CustomTextInput
                    style={emailError ? useErrorStyle : useBaseStyle}
                    onChangeText={handleEmailChange}
                    text={email}
                    placeholder={t('registrationScreen.placeholders.email')}
                />
                {isTyping && emailMessage !== '' && (
                    <Text style={styles.passwordMessage}>{emailMessage}</Text>
                )}

                <Text style={styles.labelTextPass}>
                    {t('registrationScreen.labels.password')}
                </Text>
                <View style={styles.password}>
                    <CustomTextInput
                        style={passwordError ? useErrorStyle : useBaseStyle}
                        onChangeText={handlePasswordChange}
                        text={password}
                        placeholder={t(
                            'registrationScreen.placeholders.password',
                        )}
                        isPassword
                    />
                </View>
                {isTyping && passwordMessage !== '' && (
                    <Text style={styles.passwordMessage}>
                        {passwordMessage}
                    </Text>
                )}

                <Text style={styles.labelTextPass}>
                    {t('registrationScreen.labels.confirmPassword')}
                </Text>
                <View style={styles.password}>
                    <CustomTextInput
                        style={
                            confirmPasswordError ? useErrorStyle : useBaseStyle
                        }
                        onChangeText={handleConfirmPasswordChange}
                        text={confirm}
                        placeholder={t(
                            'registrationScreen.placeholders.confirmPassword',
                        )}
                        isPassword
                    />
                </View>
                {isTyping && confirmPasswordMessage !== '' && (
                    <Text style={styles.passwordMessage}>
                        {confirmPasswordMessage}
                    </Text>
                )}

                <View style={styles.labelText}>
                    <CheckBox
                        text={t('registrationScreen.labels.termsAndConditions')}
                        checked={checked}
                        setChecked={setChecked}
                    />
                </View>

                <View style={styles.styleLogIn}>
                    <CustomGradientButton
                        text={t('registrationScreen.buttons.register')}
                        colorStart={theme.GRADIENT_FIRST}
                        colorEnd={theme.GRADIENT_SECOND}
                        onClick={register}
                    />
                </View>

                <View style={styles.noAccount}>
                    <Text style={styles.noAccountText}>
                        {t('registrationScreen.misc.changedMind')}
                    </Text>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.registerBtn}>
                            {t('registrationScreen.buttons.goBack')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default RegistrationScreen;
