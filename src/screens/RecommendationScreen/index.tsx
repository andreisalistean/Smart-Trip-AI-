import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CardComponent from 'components/Card';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TripData } from 'store/types';
import useTranslate from 'translations/useTranslate';

import createStyles from './styles';

type RecommendationScreenNavigationProp = StackNavigationProp<
    MainNavigatorStackParamList,
    typeof ROUTE_KEYS.RECOMMENDATION_SCREEN
>;

type RouteParams = {
    params: {
        trips: TripData[];
    };
};

const RecommendationScreen = () => {
    const navigation = useNavigation<RecommendationScreenNavigationProp>();
    const t = useTranslate();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const trips = route.params?.trips;

    const handleOnPress = useCallback(
        (
            item: TripData,
            isRecommendation: boolean,
            navigatedFromProfile: boolean,
        ) => {
            navigation.navigate(ROUTE_KEYS.DETAIL_SCREEN, {
                trip: item,
                isRecommendation,
                navigatedFromProfile,
            });
        },
        [navigation],
    );

    const renderItem = useCallback(
        ({ item }: { item: TripData }) => (
            <CardComponent
                item={item}
                onPress={() => handleOnPress(item, true, false)}
            />
        ),
        [handleOnPress],
    );

    const keyExtractor = useCallback(
        (item: TripData, index: number) => index.toString(),
        [],
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t('recommendationScreen.title')}</Text>
            <FlatList
                data={trips}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </SafeAreaView>
    );
};

export default RecommendationScreen;
