import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from 'context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import useTranslate from 'translations/useTranslate';
import { GRADIENT_COLORS, GRADIENT_STYLES } from 'utils/utils';

import createStyles from './style';
import { Text } from '../../components/Text';

type stripeProps = {
    data: string[];
    onPressItem: (label: string) => void;
    selectedField: string;
};
const StripeBar: React.FC<stripeProps> = ({
    data,
    onPressItem,
    selectedField,
}) => {
    const t = useTranslate();
    const gradient = useMemo(
        () => [GRADIENT_COLORS.first, GRADIENT_COLORS.second],
        [],
    );
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const renderItem = useCallback(
        ({ item }: { item: string }) => {
            const style: ViewStyle[] = [styles.item];
            return item === selectedField ? (
                <LinearGradient
                    colors={gradient}
                    start={GRADIENT_STYLES.start}
                    end={GRADIENT_STYLES.end}
                    style={styles.liniar}
                >
                    <TouchableOpacity
                        style={styles.selectedTouch}
                        onPress={() => onPressItem(item)}
                    >
                        <Text style={styles.itemTextSelected}>
                            {t('filterStripe.' + item)}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            ) : (
                <TouchableOpacity
                    style={style}
                    onPress={() => onPressItem(item)}
                >
                    <Text style={styles.itemText}>
                        {t('filterStripe.' + item)}
                    </Text>
                </TouchableOpacity>
            );
        },
        [
            gradient,
            onPressItem,
            selectedField,
            styles.item,
            styles.itemText,
            styles.itemTextSelected,
            styles.liniar,
            styles.selectedTouch,
            t,
        ],
    );

    const keyEctractor = useCallback((item: string) => item, []);
    return (
        <FlatList
            style={styles.container}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyEctractor}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};
export default StripeBar;
