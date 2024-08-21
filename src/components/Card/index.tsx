import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { GestureResponderEvent } from 'react-native';

import { useTheme } from 'context/ThemeContext';
import { ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TripData } from 'store/types';

import createStyles from './style';
import { storage } from '../../../firebaseConfig';
import { Text } from '../Text';

type CardComponentProps = {
    item: TripData;
    onPress: (event: GestureResponderEvent) => void;
};

const tripPlaceholder = '../../assets/images/trip_placeholder.png';

const CardComponent: React.FC<CardComponentProps> = React.memo(
    ({ item, onPress }) => {
        const [imageUrl, setImageUrl] = useState<string | null>(null);
        const { theme } = useTheme();
        const styles = createStyles(theme);
        useEffect(() => {
            if (item.image) {
                const fetchImageUrl = async () => {
                    try {
                        const imageRef = ref(storage, item.image);
                        const url = await getDownloadURL(imageRef);
                        setImageUrl(url);
                    } catch (error) {
                        console.error('Error fetching image URL for:', item.id);
                        setImageUrl(null);
                    }
                };

                fetchImageUrl();
            }
        }, [item.image, item.id]);

        const displayImage = useMemo(() => {
            return item.image ? { uri: imageUrl } : require(tripPlaceholder);
        }, [item.image, imageUrl]);

        const calculateRating = useMemo(() => {
            if (!item.reviews) {
                return 0;
            }
            let sum = 0;
            Object.keys(item.reviews).forEach((key) => {
                sum += item.reviews[key].rating;
            });

            return sum / Object.keys(item.reviews).length;
        }, [item.reviews]);

        return (
            <Pressable onPress={onPress}>
                <View style={styles.card}>
                    <Image source={displayImage} style={styles.image} />
                    <View>
                        <Text style={styles.description} numberOfLines={1}>
                            {item.description}
                        </Text>
                        <View style={styles.footer}>
                            <View style={styles.info}>
                                <View style={styles.location}>
                                    <Icon
                                        name="map-marker"
                                        size={25}
                                        color="gray"
                                    />
                                    <Text style={styles.locationText}>
                                        {item.country}
                                    </Text>
                                </View>
                                <View style={styles.rating}>
                                    <Icon
                                        name="star"
                                        size={20}
                                        color="white"
                                        style={styles.icons}
                                    />
                                    <Text style={styles.ratingText}>
                                        {calculateRating.toFixed(1)}/5
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    },
);

export default CardComponent;
