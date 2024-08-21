import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Switch, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomGradientButton from 'components/CustomGradientButton';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { changeLanguage } from 'translations/i18n';
import useTranslate from 'translations/useTranslate';
import { Language } from 'utils/types';
import { ALL_LANGUAGES } from 'utils/utils';

import createStyles from './styles';

type SettingsScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.SETTINGS_SCREEN
>;

const SettingsScreen = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const t = useTranslate();
    const { theme, toggleTheme, isDarkMode } = useTheme();
    const styles = createStyles(theme);
    const handleLogout = useCallback(async () => {
        try {
            await AsyncStorage.clear();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: ROUTE_KEYS.LOGIN_SCREEN }],
                }),
            );
        } catch (error) {
            Alert.alert(t('settingsScreen.errors.logoutError'));
        }
    }, [navigation, t]);

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
        t('settingsScreen.labels.selectLanguage'),
    );

    const toggleDropDown = useCallback(() => {
        setIsDropDownOpen((previousState) => !previousState);
    }, []);

    const handleLanguageSelect = useCallback(async (language: string) => {
        setSelectedLanguage(language);
        await AsyncStorage.setItem('selectedLanguage', language);
        changeLanguage(language);
        setIsDropDownOpen(false);
    }, []);

    const renderLanguageItem = useCallback(
        ({ item }: { item: Language }) => (
            <TouchableOpacity
                style={[styles.languageItem]}
                onPress={() => handleLanguageSelect(item.code)}
            >
                <Text style={[styles.languageText]}>{item.name}</Text>
            </TouchableOpacity>
        ),
        [handleLanguageSelect, styles.languageItem, styles.languageText],
    );

    const keyExtractor = useCallback((item: Language) => item.id, []);

    const toggleSwitch = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    const handlePress = useCallback(() => {
        navigation.navigate(ROUTE_KEYS.TAB_NAVIGATOR);
    }, [navigation]);

    return (
        <SafeAreaView style={[styles.container]}>
            <View>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handlePress}>
                        <Icon name="arrow-back" size={24} color={theme.TEXT} />
                    </TouchableOpacity>
                    <Text style={styles.header}>
                        {t('settingsScreen.titles.settingsAndPrivacy')}
                    </Text>
                </View>

                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>
                        {t('settingsScreen.labels.darkTheme')}
                    </Text>
                    <Switch value={!isDarkMode} onValueChange={toggleSwitch} />
                </View>

                <Text style={styles.header}>
                    {t('settingsScreen.labels.selectLanguage')}
                </Text>
                <View style={styles.dropDownContainer}>
                    <TouchableOpacity
                        style={styles.dropDownHeader}
                        onPress={toggleDropDown}
                    >
                        <Text style={styles.dropDownHeaderText}>
                            {selectedLanguage}
                        </Text>
                    </TouchableOpacity>

                    {isDropDownOpen && (
                        <FlatList
                            data={ALL_LANGUAGES}
                            renderItem={renderLanguageItem}
                            keyExtractor={keyExtractor}
                            style={styles.dropDownList}
                        />
                    )}
                </View>
            </View>

            <CustomGradientButton
                text={t('settingsScreen.buttons.logout')}
                colorStart={theme.GRADIENT_FIRST}
                colorEnd={theme.GRADIENT_SECOND}
                onClick={handleLogout}
            />
        </SafeAreaView>
    );
};

export default SettingsScreen;
