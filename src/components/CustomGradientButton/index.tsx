import React from 'react';
import {
    GestureResponderEvent,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';

import { Text } from 'components/Text';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';

interface CustomGradientButtonProps extends TouchableOpacityProps {
    text: string;
    colorStart: string;
    colorEnd: string;
    onClick: (event: GestureResponderEvent) => void;
    style?: object;
    disabled?: boolean;
}

const CustomGradientButton: React.FC<CustomGradientButtonProps> = ({
    style,
    text,
    colorStart,
    colorEnd,
    onClick,
    disabled,
}) => {
    return (
        <TouchableOpacity onPress={onClick} style={style} disabled={disabled}>
            <LinearGradient
                colors={[colorStart, colorEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default CustomGradientButton;
