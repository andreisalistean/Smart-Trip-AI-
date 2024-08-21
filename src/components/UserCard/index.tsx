import React, { useMemo } from 'react';
import {
    GestureResponderEvent,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

import { useTheme } from 'context/ThemeContext';
import { FollowerData } from 'hooks/useFetchUserData';

import createStyles from './style';
import { Text } from '../Text';

type UserCardProps = {
    item: FollowerData;
    onPress: (event: GestureResponderEvent) => void;
};

const UserCard = ({ item, onPress }: UserCardProps) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const imageSource = useMemo(() => {
        return { uri: item.avatar };
    }, [item.avatar]);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.touchable}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.avatar} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.username}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default UserCard;
