import React, { useCallback } from 'react';
import {
    Alert,
    Image,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'components/Text';
import { useTheme } from 'context/ThemeContext';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'utils/colors';
import { renderIcon } from 'utils/utils';

import createStyles from './style';
import Settings from '../../assets/svgs/settings.svg';

type Props = {
    options?: boolean;
    text?: string;
    styleSafe?: StyleProp<ViewStyle>;
    styleText?: TextStyle;
};

type NavigationProp = StackNavigationProp<MainNavigatorStackParamList>;

const CustomHeader = ({ options, text, styleSafe, styleText }: Props) => {
    const navigation = useNavigation<NavigationProp>();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const handleNavigation = useCallback(async () => {
        try {
            navigation.navigate(ROUTE_KEYS.SETTINGS_SCREEN);
        } catch (error) {
            Alert.alert('error');
        }
    }, [navigation]);

    return (
        <>
            <SafeAreaView style={styles.safe}>
                <View style={styles.view}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/images/new_logo.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        {options ?? (
                            <TouchableOpacity style={styleSafe}>
                                <Text style={styleText}>{text}</Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNavigation}>
                        {renderIcon(<Settings />, 25, Colors.SOFT_BLACK)}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
};

export default CustomHeader;
