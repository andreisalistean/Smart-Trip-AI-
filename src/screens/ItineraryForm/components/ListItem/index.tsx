import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Text } from 'components/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from 'utils/colors';

import styles from './style';

type CityProps = {
    city: string;
    onDeletePress: (city: string) => void;
};

export const ListItem = ({ city, onDeletePress }: CityProps) => {
    return (
        <View style={styles.row}>
            <Text style={styles.cityListItem}>{city}</Text>
            <TouchableOpacity
                onPress={() => {
                    onDeletePress(city);
                }}
            >
                <Icon name="close-sharp" size={18} color={Colors.WHITE} />
            </TouchableOpacity>
        </View>
    );
};
