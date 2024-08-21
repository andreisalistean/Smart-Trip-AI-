import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import TripBudgetChart from 'components/BudgetChart';
import CustomTextInput from 'components/CustomTextInput';
import { Text } from 'components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { get, ref, update } from 'firebase/database';
import { ROUTE_KEYS } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useTranslate from 'translations/useTranslate';
import { Colors } from 'utils/colors';
import { GRADIENT_STYLES2, GRADIENT_STYLES3 } from 'utils/utils';

import { styles } from './styles';
import { database } from '../../../firebaseConfig';

type ParamList = {
    BudgetPlanningScreen: {
        tripID: number;
    };
};

const categories = [
    'transport',
    'accommodation',
    'activities',
    'foodAndDrinks',
    'other',
];

type CategoryBudgets = {
    [key: string]: number | string;
};

const BudgetPlanningScreen: React.FC = () => {
    const t = useTranslate();
    const route =
        useRoute<RouteProp<ParamList, ROUTE_KEYS.BUDGET_PLANNING_SCREEN>>();
    const { tripID } = route.params;
    const [totalBudget, setTotalBudget] = useState<number>(0);
    const [categoryBudgets, setCategoryBudgets] = useState<{
        [key: string]: number;
    }>({});
    const [totalSpent, setTotalSpent] = useState<number>(0);
    const navigation = useNavigation();

    const gradientColors = useMemo(() => [Colors.MAGENTA, Colors.PURPLE], []);

    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const tripReference = ref(
                    database,
                    `users/${userData.id}/userTrips/${tripID}`,
                );
                const snapshot = await get(tripReference);
                if (snapshot && snapshot.exists()) {
                    const data = snapshot.val();
                    const totalBudget = data.budget || 0;

                    const budgetCategories: { [key: string]: number } =
                        data.budgetCategories || {};
                    const spend = Object.values(budgetCategories).reduce(
                        (acc: number, amount: number) => acc + amount,
                        0,
                    );
                    setTotalSpent(spend);

                    setTotalBudget(totalBudget);

                    setCategoryBudgets(budgetCategories);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchBudget();
    }, [tripID, userData.id]);

    const handleBudgetChange = useCallback(
        (category: string, amount: string) => {
            const newAmount = parseFloat(amount) || 0;
            const oldAmount =
                typeof categoryBudgets[category] === 'number'
                    ? (categoryBudgets[category] as number)
                    : 0;

            const availableBudget = totalBudget - totalSpent;
            const calculatedBudget = availableBudget + oldAmount - newAmount;

            if (calculatedBudget < 0) {
                Alert.alert(t('budgetPlanningScreen.alerts.exceeded'));
            } else {
                setCategoryBudgets({
                    ...categoryBudgets,
                    [category]: newAmount === 0 ? '' : newAmount,
                });
                setTotalSpent(totalBudget - calculatedBudget);
            }
        },
        [categoryBudgets, totalBudget, totalSpent, t],
    );

    const saveBudget = useCallback(async () => {
        try {
            const categoriesObject = categories.reduce(
                (obj: CategoryBudgets, category) => {
                    obj[category] = categoryBudgets[category] || 0;
                    return obj;
                },
                {},
            );

            const tripReference = ref(
                database,
                `users/${userData.id}/userTrips/${tripID}`,
            );

            await update(tripReference, {
                budgetCategories: categoriesObject,
            });

            navigation.goBack();
        } catch (error) {
            console.error('Error saving document: ', error);
            alert(t('budgetPlanningScreen.alerts.saveError'));
        }
    }, [categoryBudgets, tripID, t, navigation, userData.id]);

    const handleCategoryChange = useCallback(
        (category: string) => (amount: string) => {
            handleBudgetChange(category, amount);
        },
        [handleBudgetChange],
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <LinearGradient
                    colors={gradientColors}
                    start={GRADIENT_STYLES2.start}
                    end={GRADIENT_STYLES2.end}
                    style={styles.titleContainer}
                >
                    <Text style={styles.title}>
                        {t('budgetPlanningScreen.title.totalBudget')}: $
                        {totalBudget}
                    </Text>
                    <Text style={styles.title}>
                        {t('budgetPlanningScreen.title.availableFunds')}: $
                        {totalBudget - totalSpent}
                    </Text>
                    <Text style={styles.title}>
                        {t('budgetPlanningScreen.title.moneySpent')}: $
                        {totalSpent}
                    </Text>
                </LinearGradient>
                <TripBudgetChart
                    tripID={tripID}
                    totalBudgetProp={totalBudget}
                    totalSpentProp={totalSpent}
                />
                {categories.map((category) => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryLabel}>
                            {t(`categories.${category}`)}
                        </Text>
                        <CustomTextInput
                            style={styles.categoryInput}
                            keyboardType="decimal-pad"
                            value={categoryBudgets[category]?.toString() || ''}
                            placeholder={t(
                                'budgetPlanningScreen.placeholders.enterAmount',
                            )}
                            placeholderTextColor={Colors.WHITE_OPACITY_10}
                            onChangeText={handleCategoryChange(category)}
                        />
                    </View>
                ))}

                <LinearGradient
                    colors={gradientColors}
                    start={GRADIENT_STYLES3.start}
                    end={GRADIENT_STYLES3.end}
                    style={styles.saveButton}
                >
                    <TouchableOpacity onPress={saveBudget}>
                        <Text style={styles.saveButtonText}>
                            {t('budgetPlanningScreen.buttons.saveBudget')}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BudgetPlanningScreen;
