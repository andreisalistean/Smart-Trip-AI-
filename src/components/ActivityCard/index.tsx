import React, { useCallback, useState } from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'utils/colors';
import { renderIcon } from 'utils/utils';

import styles from './style';
import Delete from '../../assets/svgs/x.svg';
import { Text } from '../Text';

type Props = {
    description: string;
    path: string;
    onPress: () => void;
    availableDelete: boolean;
};

const ActivityCardComponent = ({
    description,
    onPress,
    availableDelete,
}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleViewMore = useCallback(() => {
        setModalVisible(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                {availableDelete && (
                    <TouchableOpacity
                        style={styles.btnX}
                        onPress={() => onPress()}
                    >
                        {renderIcon(<Delete />, 21, Colors.WHITE)}
                    </TouchableOpacity>
                )}
                <Text
                    style={styles.description}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {description}
                </Text>
                <View style={styles.buttonArrowContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleViewMore}
                    >
                        <Text style={styles.buttonText}>View More</Text>
                    </TouchableOpacity>
                    <Icon
                        name="arrow-right"
                        size={12}
                        color={Colors.WHITE}
                        style={styles.icons}
                    />
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.closeTouchTop}
                />
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleCloseModal}
                        >
                            <Icon name="close" size={24} color={Colors.WHITE} />
                        </TouchableOpacity>
                        <ScrollView
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            <Text style={styles.fullDescription}>
                                {description}
                            </Text>
                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.closeTouchBottom}
                />
            </Modal>
        </View>
    );
};

export default ActivityCardComponent;
