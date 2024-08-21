import React from 'react';
import {
    Image,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { useTheme } from 'context/ThemeContext';

import createStyles from './styles';
import { Text } from '../Text';

type Props = {
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
    textStyle?: TextStyle;
    buttonStyle?: ViewStyle;
};

const CheckBox = ({
    checked,
    setChecked,
    text,
    textStyle,
    buttonStyle,
}: Props) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setChecked(!checked);
                }}
                style={styles.touch}
            >
                <View style={[styles.view, buttonStyle]}>
                    {checked ? (
                        <Image
                            style={styles.img}
                            source={require('../../assets/images/check.png')}
                        />
                    ) : (
                        <></>
                    )}
                </View>
                <Text style={[styles.text, textStyle]}>{text}</Text>
            </TouchableOpacity>
        </>
    );
};

export default CheckBox;
