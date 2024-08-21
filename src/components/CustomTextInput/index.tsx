import React, { useCallback, useMemo, useState } from 'react';
import {
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { useTheme } from 'context/ThemeContext';
import { renderIcon } from 'utils/utils';

import createStyles from './styles';
import EyeClosed from '../../assets/svgs/eye_closed.svg';
import EyeOpen from '../../assets/svgs/eye_open.svg';

interface CustomTextInputProps extends TextInputProps {
    onChangeText: (text: string) => void;
    placeholder: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    multiline?: boolean;
    numberOfLines?: number;
    children?: React.ReactNode;
    isPassword?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { children, style, textStyle, isPassword, ...restProps } = props;
    const [visiblePassword, setVisiblePassword] = useState(isPassword);

    const finalStyle = useMemo(
        () => [styles.input, style],
        [style, styles.input],
    );
    const finalTextStyle = useMemo(
        () => [styles.textStyle, textStyle],
        [styles.textStyle, textStyle],
    );

    const eyeAvatar = useMemo(() => {
        return visiblePassword
            ? renderIcon(<EyeClosed />, 25, theme.TEXT)
            : renderIcon(<EyeOpen />, 25, theme.TEXT);
    }, [theme.TEXT, visiblePassword]);

    const changeVisibilityPass = useCallback(() => {
        setVisiblePassword(!visiblePassword);
    }, [visiblePassword]);

    return (
        <View style={finalStyle}>
            <TextInput
                {...restProps}
                style={finalTextStyle}
                placeholderTextColor={theme.PLACEHOLDER_TEXT}
                secureTextEntry={visiblePassword}
            />
            {isPassword && (
                <TouchableOpacity onPress={changeVisibilityPass}>
                    {eyeAvatar}
                </TouchableOpacity>
            )}
            {children}
        </View>
    );
};

export default CustomTextInput;
