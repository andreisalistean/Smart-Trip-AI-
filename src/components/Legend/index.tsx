import React, { useMemo } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import { Text } from 'components/Text';

import { styles } from './styles';
interface LegendProps {
    name: string;
    color: string;
    containerStyle?: ViewStyle;
    colorBoxStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const Legend: React.FC<LegendProps> = ({
    name,
    color,
    containerStyle,
    colorBoxStyle,
    textStyle,
}) => {
    const contStyle = useMemo(
        () => [styles.legendItem, containerStyle],
        [containerStyle],
    );
    const textStyles = useMemo(
        () => [styles.legendText, textStyle],
        [textStyle],
    );

    return (
        <View style={contStyle}>
            <View
                style={[
                    styles.colorBox,
                    colorBoxStyle,
                    { backgroundColor: color },
                ]}
            />
            <Text style={textStyles}>{name}</Text>
        </View>
    );
};

export default Legend;
