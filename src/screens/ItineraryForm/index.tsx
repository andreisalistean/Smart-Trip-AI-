import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ChatBot from 'components/ChatBot';
import CustomGradientButton from 'components/CustomGradientButton';
import CustomTextInput from 'components/CustomTextInput';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import useOpenAi from 'hooks/useOpenAi';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import ImagesLoadingScreen from 'screens/ImagesLoadingScreen';
import DatePicker from 'screens/ItineraryForm/components/DatePicker';
import useTranslate from 'translations/useTranslate';
import { GRADIENT_STYLES } from 'utils/utils';

import { ListItem } from './components/ListItem';
import createStyles from './style';

type InitialTrip = {
    country: string;
    cities: string[];
    startDate: string;
    endDate: string;
    description: string;
};

type ItineraryFormNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.DETAIL_SCREEN
>;

export const START_DATE = 'Start Date';
export const END_DATE = 'End Date';

const ItineraryForm = () => {
    const t = useTranslate();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const navigation = useNavigation<ItineraryFormNavigationProp>();
    const [loading, setLoading] = useState(false);

    const GRADIENT_COLOR = [theme.GRADIENT_FIRST, theme.GRADIENT_SECOND];

    const [destination, setDestination] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>(
        t('datePicker.placeholders.startDate'),
    );
    const [endDate, setEndDate] = useState<string>(
        t('datePicker.placeholders.endDate'),
    );
    const [city, setCity] = useState<string>('');
    const [cityList, setCityList] = useState<string[]>([]);
    const [minimumDate, setMinimumDate] = useState<Date>();

    const [dateError, setDateError] = useState<string>('');
    const [destinationError, setDestinationError] = useState<string>('');
    const [cityError, setCityError] = useState<string>('');

    const { getRecommandations } = useOpenAi();

    const handleAddCityButtonPress = useCallback(() => {
        if (destination.trim() === '') {
            setCityError(
                t('itineraryForm.errors.emptyDestinationWhenAddingCityMessage'),
            );
            setCity('');
            return;
        }

        if (city.trim() === '') {
            setCityError(t('itineraryForm.errors.emptyCityInputMessage'));
            return;
        }

        if (cityList.includes(city.trim())) {
            setCityError(t('itineraryForm.errors.duplicateCityMessage'));
        } else {
            const finalCity = city.trim();
            setCityList((prevCityList) => [...prevCityList, finalCity]);
            setCity('');
            setCityError('');
        }
    }, [city, cityList, t, destination]);

    const onDeleteCityPress = useCallback((cityToDelete: string) => {
        setCityList((prevCityList) =>
            prevCityList.filter((city) => city !== cityToDelete),
        );
    }, []);

    const fetchTripRecommendations = useCallback(
        async (trip: InitialTrip) => {
            setLoading(true);
            try {
                const jsonTrip = JSON.stringify(trip);
                const response = await getRecommandations(jsonTrip);
                if (response) {
                    navigation.navigate(ROUTE_KEYS.RECOMMENDATION_SCREEN, {
                        trips: response.trips,
                    });
                } else {
                    Alert.alert(t('itineraryForm.errors.noRecommendations'));
                }
            } catch (error) {
                Alert.alert(t('itineraryForm.errors.fetchError'));
            } finally {
                setLoading(false);
            }
        },
        [getRecommandations, navigation, t],
    );

    const validateInput = useCallback(
        (value: string, type: string, relatedValue?: string) => {
            switch (type) {
                case 'dates':
                    if (
                        !value ||
                        value === t('datePicker.placeholders.startDate') ||
                        !relatedValue ||
                        relatedValue === t('datePicker.placeholders.endDate')
                    ) {
                        return {
                            message: t(
                                'itineraryForm.errors.emptyDateInputMessage',
                            ),
                            hasError: true,
                        };
                    }
                    break;
                case 'destination':
                    if (!value)
                        return {
                            message: t(
                                'itineraryForm.errors.emptyInputMessage',
                            ),
                            hasError: true,
                        };
                    break;
                default:
                    return { message: '', hasError: false };
            }
            return { message: '', hasError: false };
        },
        [t],
    );

    const onGetRecommendationPress = useCallback(() => {
        const { message: dateMessage, hasError: dateHasError } = validateInput(
            startDate,
            'dates',
            endDate,
        );
        setDateError(dateMessage);

        const { message: destinationMessage, hasError: destinationHasError } =
            validateInput(destination, 'destination');
        setDestinationError(destinationMessage);

        if (dateHasError || destinationHasError) {
            return;
        }

        const trip: InitialTrip = {
            country: destination,
            cities: cityList,
            startDate: startDate,
            endDate: endDate,
            description: description,
        };

        fetchTripRecommendations(trip);
    }, [
        cityList,
        description,
        destination,
        endDate,
        startDate,
        fetchTripRecommendations,
        validateInput,
    ]);

    useEffect(() => {
        const date = new Date(startDate);
        setEndDate(t('datePicker.placeholders.endDate'));
        setMinimumDate(date);
    }, [startDate, t]);

    const handleChange = useCallback(
        (
            text: string,
            setter: (value: string) => void,
            validator: (
                value: string,
                relatedValue?: string,
            ) => {
                message: string;
                hasError: boolean;
            },
            setMessage: (value: string) => void,
            setError: (value: boolean) => void,
            relatedValue: string = '',
        ) => {
            setter(text);
            const { message, hasError } = validator(text, relatedValue);
            setMessage(message);
            setError(hasError);
        },
        [],
    );

    const handleStartDateChange = useCallback((date: string) => {
        setStartDate(date);
        setDateError('');
    }, []);

    const handleEndDateChange = useCallback((date: string) => {
        setEndDate(date);
        setDateError('');
    }, []);

    const handleDestinationChange = useCallback(
        (text: string) => {
            handleChange(
                text,
                setDestination,
                (value) => validateInput(value, 'destination'),
                setDestinationError,
                () => {},
            );

            setCityList([]);
        },
        [handleChange, validateInput],
    );

    const handleCityChange = useCallback((text: string) => {
        setCity(text);
        setCityError('');
    }, []);

    const handleDescriptionChange = useCallback((text: string) => {
        setDescription(text);
    }, []);

    if (loading) {
        return <ImagesLoadingScreen />;
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                automaticallyAdjustKeyboardInsets
            >
                <View style={styles.containerView}>
                    <LinearGradient
                        colors={GRADIENT_COLOR}
                        start={GRADIENT_STYLES.start}
                        end={GRADIENT_STYLES.end}
                        style={styles.header}
                    >
                        <Text style={styles.title}>
                            {t('itineraryForm.title')}
                        </Text>
                    </LinearGradient>

                    <View style={styles.formContainer}>
                        <View
                            style={
                                !dateError
                                    ? styles.dateRow
                                    : styles.errorDateRow
                            }
                        >
                            <DatePicker
                                date={startDate}
                                onSubmit={handleStartDateChange}
                            />
                            <Text
                                style={
                                    startDate ===
                                        t(
                                            'datePicker.placeholders.startDate',
                                        ) ||
                                    endDate ===
                                        t('datePicker.placeholders.endDate')
                                        ? styles.lineWhiteOpacity
                                        : styles.line
                                }
                            >
                                -
                            </Text>
                            <DatePicker
                                date={endDate}
                                onSubmit={handleEndDateChange}
                                minimumDate={minimumDate}
                            />
                        </View>
                        {dateError && (
                            <Text style={styles.errorText}>{dateError}</Text>
                        )}

                        <Text style={styles.text}>
                            {t('itineraryForm.destinationPrompt')}
                        </Text>
                        <View style={styles.destinationRow}>
                            <CustomTextInput
                                style={
                                    destinationError
                                        ? styles.errorDestinationInput
                                        : styles.destinationInput
                                }
                                onChangeText={handleDestinationChange}
                                value={destination}
                                placeholder={t(
                                    'itineraryForm.destinationPlaceholder',
                                )}
                                secureTextEntry={false}
                            />
                        </View>
                        {destinationError && (
                            <Text style={styles.errorText}>
                                {destinationError}
                            </Text>
                        )}
                        <View>
                            <Text style={styles.text}>
                                {t('itineraryForm.addCitiesPrompt')}
                            </Text>
                            <View style={styles.destinationRow}>
                                <CustomTextInput
                                    style={
                                        cityError
                                            ? styles.errorInput
                                            : styles.input
                                    }
                                    onChangeText={handleCityChange}
                                    value={city}
                                    placeholder={t(
                                        'itineraryForm.cityPlaceholder',
                                    )}
                                    secureTextEntry={false}
                                />
                                <CustomGradientButton
                                    style={styles.buttonStyle}
                                    text={t('itineraryForm.addButton')}
                                    colorStart={theme.GRADIENT_FIRST}
                                    colorEnd={theme.GRADIENT_SECOND}
                                    onClick={handleAddCityButtonPress}
                                />
                            </View>
                            {cityError && (
                                <Text style={styles.errorText}>
                                    {cityError}
                                </Text>
                            )}
                            {cityList.map((city, index) => (
                                <ListItem
                                    key={index}
                                    city={city}
                                    onDeletePress={onDeleteCityPress}
                                />
                            ))}
                        </View>
                        <Text style={styles.text}>
                            {t('itineraryForm.descriptionPrompt')}
                        </Text>
                        <CustomTextInput
                            style={styles.descriptionInput}
                            onChangeText={handleDescriptionChange}
                            value={description}
                            placeholder={t(
                                'itineraryForm.descriptionPlaceholder',
                            )}
                            multiline={true}
                            secureTextEntry={false}
                        />
                        <CustomGradientButton
                            text={t('itineraryForm.generateButton')}
                            colorStart={theme.GRADIENT_FIRST}
                            colorEnd={theme.GRADIENT_SECOND}
                            onClick={onGetRecommendationPress}
                        />
                    </View>
                </View>
            </ScrollView>
            <ChatBot />
        </>
    );
};

export default ItineraryForm;
