import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CardComponent from 'components/Card';
import ChatBot from 'components/ChatBot';
import StripeBar from 'components/StripeBar';
import { useTheme } from 'context/ThemeContext';
import { DataSnapshot, get, off, onChildChanged, ref } from 'firebase/database';
import useFetchUserData from 'hooks/useFetchUserData';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { TripData } from 'store/types';
import {
    calculateRating,
    calculateTripLength,
    compareStrings,
} from 'utils/utils';

import createStyles from './style';
import { database } from '../../../firebaseConfig';

type ItineraryScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.DETAIL_SCREEN
>;
const items = ['DateAdded', 'Rating', 'Country', 'Trip Length', 'User'];

const ItineraryList = () => {
    const [sortCriteria, setSortCriteria] = useState('DateAdded');
    const [data, setData] = useState<TripData[]>([]);
    const { fetchUserData } = useFetchUserData();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [sortedItems, setSortedItems] = useState(data);
    const navigation = useNavigation<ItineraryScreenNavigationProp>();

    const handleSort = useCallback((criteria: string) => {
        setSortCriteria(criteria);
    }, []);

    const fetchTrips = async () => {
        try {
            const snapshot = await get(ref(database, '/trips'));
            if (snapshot?.exists()) {
                const tripsData = snapshot.val();
                const tripsArray = Object.keys(tripsData).map((key) => ({
                    id: key,
                    ...tripsData[key],
                }));
                setData(tripsArray);
            }
        } catch (error) {
            Alert.alert('Error fetching trips data');
        }
    };
    useEffect(() => {
        fetchTrips();
    }, []);
    useEffect(() => {
        const tripsRef = ref(database, '/trips');

        const handleChildChanged = (snapshot: DataSnapshot) => {
            const changedTrip = { id: snapshot.key, ...snapshot.val() };
            setData((prevData) =>
                prevData.map((trip) =>
                    trip.id === changedTrip.id ? changedTrip : trip,
                ),
            );
        };

        onChildChanged(tripsRef, handleChildChanged);

        return () => {
            off(tripsRef, 'child_changed', handleChildChanged);
        };
    }, []);

    const handleOnPress = useCallback(
        (
            item: TripData,
            isRecommendation: boolean,
            navigatedFromProfile: boolean,
        ) => {
            navigation.navigate(ROUTE_KEYS.DETAIL_SCREEN, {
                trip: item,
                isRecommendation,
                navigatedFromProfile: navigatedFromProfile,
            });
        },
        [navigation],
    );

    useEffect(() => {
        data.forEach((trip) => {
            fetchUserData(trip.createdBy, false);
        });
    }, [data, fetchUserData]);

    useEffect(() => {
        const sortedArray = [...data];
        if (sortCriteria === 'Country') {
            sortedArray.sort((a, b) => compareStrings(a.country, b.country));
        } else if (sortCriteria === 'Rating') {
            sortedArray.sort((a, b) => calculateRating(b) - calculateRating(a));
        } else if (sortCriteria === 'All') {
            sortedArray;
        } else if (sortCriteria === 'Trip Length') {
            sortedArray.sort(
                (a, b) => calculateTripLength(a) - calculateTripLength(b),
            );
        } else if (sortCriteria === 'DateAdded') {
            sortedArray.sort(
                (a, b) =>
                    new Date(a.startDate).getTime() -
                    new Date(b.startDate).getTime(),
            );
        }
        //to do-add user sorting
        // }else if (sortCriteria === 'User'){

        // }
        setSortedItems([...sortedArray]);
    }, [sortCriteria, data, fetchUserData]);

    const renderItem = useCallback(
        ({ item }: { item: TripData }) => {
            return (
                <CardComponent
                    item={item}
                    onPress={() => handleOnPress(item, false, false)}
                />
            );
        },
        [handleOnPress],
    );

    const keyExtractor = useCallback(
        (item: TripData, index: number) => item.createdBy + index,
        [],
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.stripeContainer}>
                <StripeBar
                    selectedField={sortCriteria}
                    data={items}
                    onPressItem={handleSort}
                />
            </View>
            <FlatList
                data={sortedItems}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
            <ChatBot />
        </SafeAreaView>
    );
};
export default ItineraryList;
