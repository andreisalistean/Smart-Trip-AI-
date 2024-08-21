import React from 'react';
import { View } from 'react-native';

import { Text } from 'components/Text';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';

interface ReviewProps {
    userName: string;
    comment: string;
    image?: string;
    rating?: number;
}

const iconArray = new Array(5).fill(true);

const ReviewCard: React.FC<ReviewProps> = ({ userName, comment, rating }) => {
    return (
        <View style={styles.container}>
            <View style={styles.start}>
                <Text style={styles.userName}>{userName}</Text>
                <View style={styles.icons}>
                    {iconArray.map((item, index) => (
                        <Icon
                            key={index}
                            name="star"
                            color={index < (rating ?? 0) ? 'pink' : 'grey'}
                        ></Icon>
                    ))}
                </View>
            </View>
            <Text style={styles.comment}>{comment}</Text>
        </View>
    );
};

export default ReviewCard;
