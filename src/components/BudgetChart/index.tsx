import React, { useEffect, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import Legend from 'components/Legend';
import { get, onValue, ref } from 'firebase/database';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Colors } from 'utils/colors';
import { SCREEN_WIDTH } from 'utils/const';

import { styles } from './styles';
import { database } from '../../../firebaseConfig';
interface ChartData {
    name: string;
    amount: number;
    color: string;
}

interface BudgetChartProps {
    tripID: number;
    style?: ViewStyle;
    totalBudgetProp?: number;
    totalSpentProp?: number;
    height?: number;
    width?: number;
    dataName1?: string;
    dataName2?: string;
    color1?: string;
    color2?: string;
    customData?: ChartData[];
}

const TripBudgetChart: React.FC<BudgetChartProps> = ({
    tripID,
    style,
    totalBudgetProp,
    totalSpentProp,
    height,
    width,
    dataName1,
    dataName2,
    color1,
    color2,
    customData,
}) => {
    const [totalBudget, setTotalBudget] = useState<number>(0);
    const [totalSpent, setTotalSpent] = useState<number>(0);

    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );

    useEffect(() => {
        const tripReference = ref(
            database,
            `users/${userData.id}/userTrips/${tripID}`,
        );

        const fetchBudgetData = async () => {
            try {
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
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBudgetData();

        const unsubscribe = onValue(tripReference, (snapshot) => {
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
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tripID, userData.id]);

    useEffect(() => {
        if (totalBudgetProp) setTotalBudget(totalBudgetProp);
        if (totalSpentProp) setTotalSpent(totalSpentProp);
    }, [totalBudgetProp, totalSpentProp]);

    const screenWidth = SCREEN_WIDTH;
    const chartWidth = screenWidth - (width || 92);
    const chartHeight = height || 168;

    const percentageSpent = ((100 * totalSpent) / totalBudget).toFixed(1);
    const percentageAvailable = (
        (100 * (totalBudget - totalSpent)) /
        totalBudget
    ).toFixed(1);

    const name1 = dataName1 || `%${percentageSpent} Spent`;
    const name2 = dataName2 || `%${percentageAvailable} Available`;

    const chartData = useMemo(
        () => [
            {
                name: name1,
                amount: totalSpent,
                color: color1 || Colors.LIGHT_PURPLE,
            },
            {
                name: name2,
                amount: totalBudget - totalSpent,
                color: color2 || Colors.PINK,
            },
        ],
        [totalSpent, totalBudget, color1, color2, name1, name2],
    );

    const chartConfig = {
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        decimalPlaces: 2,
    };

    return (
        <View style={[styles.chartContainer, style]}>
            <View style={[style]}>
                <PieChart
                    style={styles.pieContainer}
                    data={customData || chartData}
                    width={chartWidth}
                    height={chartHeight}
                    chartConfig={chartConfig}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="0"
                    hasLegend={false}
                />
            </View>
            <View style={[styles.legendContainer, style]}>
                {(customData || chartData).map(({ name, color }) => {
                    return (
                        <Legend
                            key={name}
                            name={name}
                            color={color}
                            textStyle={styles.legendText}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default TripBudgetChart;
