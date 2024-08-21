import React, { useCallback, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

import CustomGradientButton from 'components/CustomGradientButton';
import CustomTextInput from 'components/CustomTextInput';
import { Text } from 'components/Text';
import { useSaveReview } from 'hooks/useSaveReview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Review } from 'store/types';
import useTranslate from 'translations/useTranslate';
import { Colors } from 'utils/colors';

import styles from './styles';

type ReviewProps = {
    tripId: string;
};

const iconArray = new Array(5).fill(true);

export const ReviewButton = ({ tripId }: ReviewProps) => {
    const t = useTranslate();
    const [isAddReviewModalVisible, setIsAddReviewModalVisible] =
        useState(false);
    const [reviewText, setReviewText] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const onAddReviewPress = useCallback(() => {
        setIsAddReviewModalVisible((prev) => !prev);
    }, []);
    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );

    const { saveReview } = useSaveReview({ tripId: tripId });

    const handleSaveReview = useCallback(() => {
        const review: Review = {
            userId: userData.id,
            text: reviewText,
            rating: rating,
        };
        saveReview(review);
        setIsAddReviewModalVisible(false);
        setReviewText('');
        setRating(0);
    }, [rating, reviewText, saveReview, userData.id]);

    const onStarsPress = (index: number) => {
        setRating(index + 1);
    };

    const handleSave = useCallback(() => {
        setIsAddReviewModalVisible(!isAddReviewModalVisible);
    }, [isAddReviewModalVisible]);

    return (
        <View style={styles.container}>
            <CustomGradientButton
                text={t('reviewSort.addReview')}
                colorStart={Colors.MAGENTA}
                colorEnd={Colors.PURPLE}
                onClick={onAddReviewPress}
                style={styles.button}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={isAddReviewModalVisible}
            >
                <View style={styles.centeredView}>
                    <TouchableOpacity
                        style={styles.topView}
                        activeOpacity={1}
                        onPressOut={() => setIsAddReviewModalVisible(false)}
                    ></TouchableOpacity>
                    <View style={styles.modalView}>
                        <Text style={styles.reviewTitle}>
                            {t('reviewsButton.addReview')}
                        </Text>
                        <CustomTextInput
                            style={styles.reviewInput}
                            onChangeText={setReviewText}
                            text={reviewText}
                            secureTextEntry={false}
                            placeholder={''}
                            multiline={true}
                            maxLength={200}
                            numberOfLines={5}
                        />
                        <View style={styles.icons}>
                            {iconArray.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => onStarsPress(index)}
                                >
                                    <Icon
                                        name="star"
                                        size={24}
                                        color={
                                            index < rating
                                                ? Colors.MAGENTA
                                                : 'grey'
                                        }
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleSave()}>
                                <Text style={styles.reviewText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSaveReview}>
                                <Text style={styles.reviewText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bottomView}
                        activeOpacity={1}
                        onPressOut={() => setIsAddReviewModalVisible(false)}
                    ></TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
