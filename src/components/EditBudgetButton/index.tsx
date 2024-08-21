import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { EditBudgetButtonProps } from 'utils/types';
import { GRADIENT_COLORS, GRADIENT_STYLES } from 'utils/utils';

import { styles } from './styles';

const EditBudgetButton: React.FC<EditBudgetButtonProps> = ({
    tripID,
    style,
}) => {
    type EditBudgetButtonNavigationProp = StackNavigationProp<
        MainNavigatorStackParamList,
        typeof ROUTE_KEYS.BUDGET_PLANNING_SCREEN
    >;
    const navigation = useNavigation<EditBudgetButtonNavigationProp>();

    const handleNavigate = useCallback(() => {
        navigation.navigate(ROUTE_KEYS.BUDGET_PLANNING_SCREEN, { tripID });
    }, [navigation, tripID]);

    const gradientColors = useMemo(
        () => [GRADIENT_COLORS.first, GRADIENT_COLORS.second],
        [],
    );

    const textStyle = useMemo(() => [styles.buttonText, style], [style]);
    const buttonStyle = useMemo(() => [styles.button, style], [style]);

    return (
        <TouchableOpacity onPress={handleNavigate}>
            <LinearGradient
                colors={gradientColors}
                start={GRADIENT_STYLES.start}
                end={GRADIENT_STYLES.end}
                style={buttonStyle}
            >
                <Text style={textStyle}>Edit Budget</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default EditBudgetButton;
