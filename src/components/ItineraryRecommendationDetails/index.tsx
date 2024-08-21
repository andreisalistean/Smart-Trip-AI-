import React, {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    Alert,
    FlatList,
    Image,
    Linking,
    ListRenderItem,
    Modal,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import ActivityCardComponent from 'components/ActivityCard';
import TripBudgetChart from 'components/BudgetChart';
import ChatBot from 'components/ChatBot';
import CustomGradientButton from 'components/CustomGradientButton';
import EditBudgetButton from 'components/EditBudgetButton';
import { Map } from 'components/Map';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { get, onValue, ref, update } from 'firebase/database';
import useSaveItineraries from 'hooks/useSaveItinearies';
import useTripPhoto from 'hooks/useTripPhoto';
import { Region } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import SwipeButton from 'rn-swipe-button';
import DatePicker from 'screens/ItineraryForm/components/DatePicker';
import { RootState } from 'store';
import { actions } from 'store/reducers/tripDataReducer';
import { Activity, Review, TripData, UserData } from 'store/types';
import useTranslate from 'translations/useTranslate';
import { Colors } from 'utils/colors';
import { GRADIENT_COLORS, GRADIENT_STYLES } from 'utils/utils';

import { ReviewButton } from './components/ReviewButton';
import styles from './styles';
import { database } from '../../../firebaseConfig';
import createStyles from '../../screens/ItineraryForm/style';

const PREFIX_NAVIGATION_URL = 'google.navigation:q=';

type ItineraryRecommendationDetailsProps = {
    trip: TripData;
    isRecommendation: boolean;
    navigatedFromProfile: boolean;
};

type User = {
    username: string;
    userId: string;
};

const ItineraryRecommendationDetails: React.FC<
    ItineraryRecommendationDetailsProps
> = ({ trip, isRecommendation, navigatedFromProfile }) => {
    const userID = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    ).id;
    const [sort, setSort] = useState<string>('Rating High');
    const [sortedArray, setSortedArray] = useState<Review[]>();
    const [rating, setRating] = useState(0);
    const iconArray = new Array(5).fill(true);
    const t = useTranslate();
    const [isBudgetModalVisible, setBudgetModalVisible] = useState(false);
    const [budgetInput, setBudgetInput] = useState('');
    const [userTrips, setUserTrips] = useState<TripData[]>();

    const fetchUserTrips = useCallback(async () => {
        try {
            const userTripsSnapshot = await get(
                ref(database, `users/${userID}/userTrips`),
            );
            if (userTripsSnapshot.exists()) {
                setUserTrips(userTripsSnapshot.val());
            }
        } catch (error) {
            console.error('Error fetching user trips:', error);
        }
    }, [userID]);

    const START_DATE = t('datePicker.placeholders.startDate');
    const END_DATE = t('datePicker.placeholders.endDate');

    const { theme } = useTheme();
    const itenararyFormStyles = createStyles(theme);
    useEffect(() => {
        fetchUserTrips();
    }, [fetchUserTrips]);

    const getIndexOfCurrentTrip = useCallback(
        (userTripsArray: TripData[]) => {
            return userTripsArray.findIndex(
                (userTrip) =>
                    userTrip.createdBy === trip.createdBy &&
                    userTrip.startDate === trip.startDate,
            );
        },
        [trip.createdBy, trip.startDate],
    );

    const saveBudget = useCallback(async () => {
        const parsedAmount = parseFloat(budgetInput);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
            try {
                if (userTrips) {
                    const tripIndex = getIndexOfCurrentTrip(userTrips);
                    if (tripIndex !== -1) {
                        const tripReference = ref(
                            database,
                            `users/${userID}/userTrips/${tripIndex}`,
                        );
                        await update(tripReference, { budget: parsedAmount });
                        Alert.alert('Budget added successfully!');
                        setBudgetModalVisible(false);
                    } else {
                        Alert.alert('Trip not found.');
                    }
                } else {
                    Alert.alert('User trips not loaded.');
                }
            } catch (error) {
                console.error('Error updating budget: ', error);
                Alert.alert('Failed to add budget. Please try again.');
            }
        } else {
            Alert.alert('Please enter a valid budget amount.');
        }
    }, [budgetInput, userTrips, userID, getIndexOfCurrentTrip]);

    const handleAddBudget = () => setBudgetModalVisible(true);
    const closeBudgetModal = () => {
        setBudgetModalVisible(false);
        setBudgetInput('');
    };

    const currentTrip = userTrips
        ? userTrips[getIndexOfCurrentTrip(userTrips)]
        : undefined;
    const [users, setUsers] = useState<User[]>([]);
    const [reviewsData, setReviewsData] = useState<Review[]>([]);

    useEffect(() => {
        if (!reviewsData) return;

        let sortedReviews: Review[] = [];
        if (rating === 0) sortedReviews = Object.values(reviewsData);
        else
            Object.values(reviewsData).map((item) => {
                if (item.rating === rating) sortedReviews.push(item);
            });
        switch (sort) {
            case 'Name':
                sortedReviews = sortedReviews.sort((a, b) => {
                    return a.authorName < b.authorName ? 1 : -1;
                });
                break;
            case 'Rating Low':
                sortedReviews = sortedReviews.sort(
                    (a, b) => a.rating - b.rating,
                );
                break;
            default:
                sortedReviews = sortedReviews.sort(
                    (a, b) => b.rating - a.rating,
                );
                break;
        }
        setSortedArray(sortedReviews);
    }, [rating, sort, reviewsData]);

    const styleSort = useCallback(
        (sortType: string) => {
            if (sortType === sort) return styles.selectedSortBtn;
            else return styles.sortBtn;
        },
        [sort],
    );
    const noReview = useMemo(() => {
        return (
            <>
                <View style={styles.viewReview}>
                    <Text style={styles.authorReview}>
                        {t('reviewSort.noReviewsAdded')}
                    </Text>
                </View>
            </>
        );
    }, [t]);

    const renderActivity = useCallback<ListRenderItem<Activity>>(
        ({ item }) => (
            <View style={styles.activityContainer}>
                <ActivityCardComponent
                    description={item.description}
                    //TODO: modify this to photos from firebase
                    path={item.image}
                />
            </View>
        ),
        [],
    );
    const { saveItineraries } = useSaveItineraries();
    const startDateFormatted = useMemo(() => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        } as const;
        const date = new Date(trip.startDate);
        return date.toLocaleDateString(undefined, options);
    }, [trip.startDate]);

    const endDateFormatted = useMemo(() => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        } as const;
        const date = new Date(trip.endDate);
        return date.toLocaleDateString(undefined, options);
    }, [trip.endDate]);

    const { pickImage, imageUrl } = useTripPhoto(
        actions.updateTrips,
        'tripImages',
        'trips',
        'image',
        trip.image,
        trip.id,
    );

    const saveChanges = useCallback(async () => {
        try {
            const tripRef = ref(database, `trips/${trip.id}`);
            await update(tripRef, {
                image: imageUrl,
            });
        } catch (error) {
            Alert.alert('Error updating trip data! ');
        }
    }, [trip.id, imageUrl]);

    useEffect(() => {
        if (imageUrl) {
            saveChanges();
        }
    }, [imageUrl, saveChanges]);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [datePickerModalVisibility, setDatePickerModalVisibility] =
        useState(false);
    const [activities, setActivities] = useState([]);
    const [region, setRegion] = useState<Region>();
    const [startDate, setStartDate] = useState<string>(
        t('datePicker.placeholders.startDate'),
    );
    const [endDate, setEndDate] = useState<string>(
        t('datePicker.placeholders.endDate'),
    );
    const [numberOfDays, setNumberOfDays] = useState<number>(0);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [maximumDate, setMaximumDate] = useState<Date>();
    const [saveButtonText, setSaveButtonText] = useState<string>(
        t('saveToMyTrips.buttonText'),
    );
    const [isSaveTripButtonActive, setSaveTripButtonActive] = useState(false);
    const finalLinearGradientStyle = useMemo(
        () => [GRADIENT_COLORS.first, GRADIENT_COLORS.second],
        [],
    );
    const linearGradientModalMapViewStyle = useMemo(
        () => [styles.modalContainer, { margin: 10 }],
        [],
    );
    const finalStyleModalCloseIcon = useMemo(
        () => [styles.icons, { right: 10 }],
        [],
    );
    const tripPlaceholder = '../../assets/images/trip_placeholder.png';
    const displayImage = useMemo(() => {
        return trip.image ? { uri: imageUrl } : require(tripPlaceholder);
    }, [trip.image, imageUrl]);

    useEffect(() => {
        const activitiesData = [];
        setNumberOfDays(trip.days.length);
        trip.days.map((day) => {
            day.cities.map((city) => {
                city.activities.map((activity) => {
                    activitiesData.push({
                        name: activity.name,
                        lat: parseFloat(activity.locationLatitude),
                        lng: parseFloat(activity.locationLongitude),
                    });
                });
            });
        });
        setActivities(activitiesData);
        setRegion({
            latitude: activitiesData[0].lat,
            longitude: activitiesData[0].lng,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8,
        });
    }, [trip]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [creatorData, setCreatorData] = useState<UserData>();

    const setDatePickerModalVisibilityCallback = useCallback(() => {
        setDatePickerModalVisibility(!datePickerModalVisibility);
    }, [datePickerModalVisibility]);
    const fetchCreatorData = useCallback(async (userId: string) => {
        const userRef = ref(database, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot && snapshot.exists()) {
            const data = snapshot.val();
            setCreatorData(data);
        }
    }, []);
    useEffect(() => {
        if (trip.createdBy) {
            fetchCreatorData(trip.createdBy);
        }
    }, [fetchCreatorData, trip.createdBy]);

    useEffect(() => {
        if (
            startDate !== t('datePicker.placeholders.startDate') &&
            endDate !== t('datePicker.placeholders.endDate') &&
            Date.parse(startDate) < Date.parse(endDate)
        ) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [startDate, endDate, t]);

    const [minimumDate, setMinimumDate] = useState<Date>();

    useEffect(() => {
        const date = new Date(startDate);
        setEndDate(t('datePicker.placeholders.endDate'));
        setMinimumDate(date);
        setSaveTripButtonActive(false);
    }, [END_DATE, startDate, t]);

    useEffect(() => {
        if (endDate !== END_DATE) {
            setSaveTripButtonActive(true);
        }
    }, [END_DATE, endDate, isSaveTripButtonActive]);

    const openGoogleMaps = useCallback(() => {
        const wayOne = `${activities[0].lat},${activities[0].lng}`;
        const navigationURL = `${PREFIX_NAVIGATION_URL}${wayOne}`;
        setTimeout(() => {
            Linking.openURL(navigationURL).catch((err) =>
                console.error('Failed to open URL', err),
            );
        }, 500);
    }, [activities]);

    const handleSave = useCallback(async () => {
        if (Date.parse(startDate) < Date.parse(endDate)) {
            trip.startDate = startDate;
            trip.endDate = endDate;
            await saveItineraries(trip, isRecommendation)
                .then(() => {
                    setDatePickerModalVisibilityCallback(false);
                    setSaveButtonText(t('saveToMyTrips.buttonTextSaved'));
                    setIsButtonActive(false);
                })
                .catch((error) => {
                    alert(`Failed to save itineraries: ${error}`);
                });
        } else {
            alert(
                'Start date has passed the End Date, please select a correct date',
            );
        }
    }, [
        startDate,
        endDate,
        trip,
        saveItineraries,
        isRecommendation,
        setDatePickerModalVisibilityCallback,
        t,
    ]);

    const changeTheVisibilityOfModal = useCallback(
        () => setModalVisibility((prev) => !prev),
        [],
    );

    const getUsers = useCallback(async (usersIds: readonly string[]) => {
        if (!usersIds) return [];
        const fetchedUsers: User[] = [];

        for (let i = 0; i < usersIds.length; i++) {
            try {
                const snapshot = await get(
                    ref(database, '/users/' + usersIds[i]),
                );
                if (snapshot && snapshot.exists()) {
                    const user = snapshot.val();
                    const newUser: User = {
                        userId: usersIds[i],
                        username: user.userName,
                    };
                    fetchedUsers.push(newUser);
                }
            } catch (error) {
                return [];
            }
        }
        return fetchedUsers;
    }, []);

    useEffect(() => {
        if (!trip.reviews) return;
        if (trip.id) {
            const reviewsRef = ref(database, `/trips/${trip.id}/reviews`);
            onValue(reviewsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const reviewsData = snapshot.val();
                    setReviewsData(Object.values(reviewsData));
                    const usersIds: string[] = Object.values(reviewsData).map(
                        (item) => item.userId,
                    );
                    getUsers(usersIds).then((fetchedUsers) => {
                        setUsers(fetchedUsers);
                    });
                }
            });
        }
    }, [trip.reviews, getUsers, trip.id]);

    const reviews = useCallback(() => {
        const revArray: ReactNode[] = [];
        if (!sortedArray) {
            revArray.push(noReview);
        } else {
            let i = 0;
            sortedArray.forEach((item) => {
                revArray.push(
                    <>
                        <View key={item.id} style={styles.viewReview}>
                            <View style={styles.headerReview}>
                                <Text style={styles.authorReview}>
                                    {users[i] === undefined
                                        ? 'AuthorName'
                                        : users[i].username}
                                </Text>
                                <View style={styles.viewRating}>
                                    <Icon
                                        name="star"
                                        size={12}
                                        color="white"
                                        style={styles.icons}
                                    />
                                    <Text style={styles.ratingReview}>
                                        {item.rating} / 5
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.textReview}>{item.text}</Text>
                        </View>
                    </>,
                );
                i++;
            });
        }
        return revArray;
    }, [sortedArray, noReview, users]);

    const keyExtractorActivity = useCallback((item: Activity) => item.id, []);
    const ratingPress = useCallback(
        (index: number) => setRating(index + 1),
        [],
    );
    const setFilterAll = useCallback(() => {
        setRating(0);
    }, []);
    const sortType = useCallback((type: number) => {
        if (type === 0) setSort('Rating High');
        else if (type === 1) setSort('Rating Low');
        else if (type === 2) setSort('Name');
    }, []);
    const DateModalPickerVisibility = useCallback(async () => {
        if (isRecommendation) {
            await saveItineraries(trip, isRecommendation)
                .then(() => {
                    setSaveButtonText('Saved');
                    setIsButtonActive(false);
                })
                .catch((error) => {
                    alert(`Failed to save itineraries: ${error}`);
                });
        } else {
            setDatePickerModalVisibilityCallback(!isRecommendation);
        }
    }, [
        isRecommendation,
        saveItineraries,
        setDatePickerModalVisibilityCallback,
        trip,
    ]);

    useEffect(() => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + numberOfDays);
        setMaximumDate(date);
    }, [numberOfDays, startDate]);

    useEffect(() => {
        setStartDate(t('datePicker.placeholders.startDate'));
        setEndDate(t('datePicker.placeholders.endDate'));
    }, [END_DATE, START_DATE, datePickerModalVisibility, t]);

    const styleAll = useCallback(() => {
        return rating === 0 ? styles.selectedSortBtn : styles.sortBtn;
    }, [rating]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContainerStyle}
                style={styles.container}
            >
                <LinearGradient
                    colors={finalLinearGradientStyle}
                    start={GRADIENT_STYLES.start}
                    end={GRADIENT_STYLES.end}
                    style={styles.gradient}
                >
                    <Image style={styles.photo} source={displayImage} />
                    {!isRecommendation && userID === trip.createdBy && (
                        <TouchableOpacity
                            style={styles.tripImageEditButton}
                            onPress={pickImage}
                        >
                            <Icon
                                name="camera"
                                size={20}
                                color={Colors.WHITE}
                            />
                        </TouchableOpacity>
                    )}
                </LinearGradient>
                {userID !== trip.createdBy && (
                    <View style={styles.viewSaveTripButton}>
                        <CustomGradientButton
                            text={saveButtonText}
                            colorStart={Colors.MAGENTA}
                            colorEnd={Colors.PURPLE}
                            onClick={DateModalPickerVisibility}
                            style={styles.addToMyTripsText}
                            disabled={isButtonActive}
                        />
                    </View>
                )}
                {!isRecommendation && (
                    <Modal
                        visible={datePickerModalVisibility}
                        animationType="fade"
                        transparent={true}
                    >
                        <View style={styles.dateModalBackground}>
                            <View style={styles.dateModalContainer}>
                                <View style={styles.headerModalDatePicker}>
                                    <Text style={styles.modalMessage}>
                                        {t('saveToMyTrips.modalPleaseText')}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={
                                            setDatePickerModalVisibilityCallback
                                        }
                                    >
                                        <Icon
                                            name="close"
                                            size={24}
                                            color={Colors.WHITE}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={itenararyFormStyles.dateRow}>
                                    <DatePicker
                                        date={startDate}
                                        onSubmit={setStartDate}
                                    />
                                    <Text
                                        style={
                                            startDate ===
                                                t(
                                                    'datePicker.placeholders.startDate',
                                                ) ||
                                            endDate ===
                                                t(
                                                    'datePicker.placeholders.endDate',
                                                )
                                                ? itenararyFormStyles.lineWhiteOpacity
                                                : itenararyFormStyles.line
                                        }
                                    >
                                        -
                                    </Text>
                                    <DatePicker
                                        date={endDate}
                                        onSubmit={setEndDate}
                                        minimumDate={minimumDate}
                                        maximumDate={maximumDate}
                                    />
                                </View>
                                <CustomGradientButton
                                    text={t('saveToMyTrips.modalButtonText')}
                                    colorStart={Colors.MAGENTA}
                                    colorEnd={Colors.PURPLE}
                                    onClick={handleSave}
                                    style={styles.addToMyTripsText}
                                    disabled={!isSaveTripButtonActive}
                                />
                            </View>
                        </View>
                    </Modal>
                )}

                <Modal visible={modalVisibility} animationType="fade">
                    <LinearGradient
                        colors={finalLinearGradientStyle}
                        style={styles.linearGradientModalContainer}
                    >
                        <View style={linearGradientModalMapViewStyle}>
                            <View style={styles.modalHeader}>
                                <SwipeButton
                                    width={200}
                                    title="Navigate"
                                    titleColor={Colors.WHITE}
                                    onSwipeSuccess={openGoogleMaps}
                                    swipeSuccessThreshold={90}
                                    shouldResetAfterSuccess={true}
                                    resetAfterSuccessAnimDelay={1000}
                                    railBackgroundColor={Colors.MAGENTA}
                                    railStyles={styles.swipeButtonRailStyle}
                                    thumbIconBackgroundColor={Colors.WHITE}
                                />

                                <TouchableOpacity
                                    onPress={changeTheVisibilityOfModal}
                                >
                                    <Icon
                                        name="close"
                                        size={50}
                                        color="white"
                                        style={finalStyleModalCloseIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            {region && (
                                <Map
                                    region={region}
                                    mapStyle={styles.mapContainer}
                                    trip={activities}
                                ></Map>
                            )}
                        </View>
                    </LinearGradient>
                </Modal>
                {userID === trip.createdBy && navigatedFromProfile && (
                    <>
                        {currentTrip?.budget !== undefined &&
                        !isNaN(currentTrip?.budget) ? (
                            <>
                                <TripBudgetChart
                                    tripID={getIndexOfCurrentTrip(userTrips)}
                                />
                                <EditBudgetButton
                                    tripID={getIndexOfCurrentTrip(userTrips)}
                                />
                            </>
                        ) : (
                            <CustomGradientButton
                                style={{ width: '90%', alignSelf: 'center' }}
                                colorStart={Colors.MAGENTA}
                                colorEnd={Colors.PURPLE}
                                text="Add Budget"
                                onClick={handleAddBudget}
                            />
                        )}
                    </>
                )}
                <Modal
                    visible={isBudgetModalVisible}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.budgetModalBackground}>
                        <View style={styles.budgetModalContainer}>
                            <Text style={styles.budgetModalTitle}>
                                Add Budget
                            </Text>
                            <TextInput
                                style={styles.budgetModalInput}
                                placeholder="Enter budget amount"
                                keyboardType="numeric"
                                value={budgetInput}
                                onChangeText={setBudgetInput}
                            />
                            <View style={styles.budgetModalButtonContainer}>
                                <TouchableOpacity
                                    style={styles.budgetModalButton}
                                    onPress={saveBudget}
                                >
                                    <Text style={styles.budgetModalButtonText}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.budgetModalButton}
                                    onPress={closeBudgetModal}
                                >
                                    <Text style={styles.budgetModalButtonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* TripData */}
                <View style={styles.tripDetails}>
                    <Text style={styles.title}>{trip.description}</Text>
                    <Text style={styles.detail}>
                        {t('itineraryDetail.country')} {trip.country}
                    </Text>
                    <Text style={styles.detail}>
                        {t('itineraryDetail.startDate')} {startDateFormatted}
                    </Text>
                    <Text style={styles.detail}>
                        {t('itineraryDetail.endDate')} {endDateFormatted}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.mapComponentTouchable}
                    onPress={changeTheVisibilityOfModal}
                >
                    {region && (
                        <Map
                            region={region}
                            mapStyle={styles.mapContainer}
                            trip={activities}
                        />
                    )}
                </TouchableOpacity>
                {/* Activities displayed on each day */}
                {trip.days.map((day, dayIndex) => (
                    <View key={dayIndex} style={styles.dayContainer}>
                        <Text style={styles.dayTitle}>
                            {t('itineraryDetail.day')} {dayIndex + 1}
                        </Text>
                        {day.cities.map((city, cityIndex) => (
                            <View key={cityIndex} style={styles.cityContainer}>
                                <Text style={styles.cityName}>{city.name}</Text>
                                <FlatList
                                    data={city.activities}
                                    renderItem={renderActivity}
                                    keyExtractor={keyExtractorActivity}
                                    horizontal
                                />
                            </View>
                        ))}
                    </View>
                ))}
                {/* reviews section, only if it is an Itinerary detail page and not a Recommendation screen */}
                {!isRecommendation && (
                    <>
                        <ReviewButton tripId={trip.id} />
                        <View style={styles.reviewsSection}>
                            <Text style={styles.reviewsTitle}>
                                {t('reviewSort.reviews')}
                            </Text>
                            <View style={styles.viewSort}>
                                <View style={styles.sort}>
                                    <Text style={styles.authorReview}>
                                        {t('reviewSort.sortBy')}
                                    </Text>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <TouchableOpacity
                                            onPress={() => sortType(0)}
                                            style={styleSort('Rating High')}
                                        >
                                            <Text style={styles.textSortBtn}>
                                                {t('reviewSort.RatingHigh')}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                sortType(1);
                                            }}
                                            style={styleSort('Rating Low')}
                                        >
                                            <Text style={styles.textSortBtn}>
                                                {t('reviewSort.RatingLow')}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                sortType(2);
                                            }}
                                            style={styleSort('Name')}
                                        >
                                            <Text style={styles.textSortBtn}>
                                                {t('reviewSort.Name')}
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                                <View style={styles.sort}>
                                    <View>
                                        <Text style={styles.authorReview}>
                                            {t('reviewSort.filterBy')}
                                        </Text>
                                        <View style={styles.styleFilter}>
                                            <TouchableOpacity
                                                onPress={setFilterAll}
                                                style={styleAll()}
                                            >
                                                <Text
                                                    style={styles.textSortBtn}
                                                >
                                                    {t('reviewSort.All')}
                                                </Text>
                                            </TouchableOpacity>
                                            {iconArray.map((item, index) => (
                                                <Icon
                                                    key={index}
                                                    name="star"
                                                    color={
                                                        index < (rating ?? 0)
                                                            ? Colors.MAGENTA
                                                            : 'grey'
                                                    }
                                                    onPress={() =>
                                                        ratingPress(index)
                                                    }
                                                    style={styles.star}
                                                ></Icon>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {reviews()}
                        </View>
                    </>
                )}
            </ScrollView>
            <ChatBot />
        </SafeAreaView>
    );
};

export default ItineraryRecommendationDetails;
