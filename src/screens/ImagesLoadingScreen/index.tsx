import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, ImageSourcePropType, View } from 'react-native';

import { useTheme } from 'context/ThemeContext';
import LoadingScreen from 'screens/LoadingScreen';
import useTranslate from 'translations/useTranslate';
import { SCREEN_WIDTH } from 'utils/const';

import { createStyles } from './style';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

type ImagesType = {
    id: number;
    url: ImageSourcePropType;
};

export const images: ImagesType[] = [
    { id: 1, url: require('../../assets/loadingImages/l_img_1.jpg') },
    { id: 2, url: require('../../assets/loadingImages/l_img_2.jpg') },
    { id: 3, url: require('../../assets/loadingImages/l_img_3.jpg') },
    { id: 4, url: require('../../assets/loadingImages/l_img_4.jpg') },
    { id: 5, url: require('../../assets/loadingImages/l_img_5.jpg') },
    { id: 6, url: require('../../assets/loadingImages/l_img_6.jpg') },
    { id: 7, url: require('../../assets/loadingImages/l_img_7.jpg') },
    { id: 8, url: require('../../assets/loadingImages/l_img_8.jpg') },
    { id: 9, url: require('../../assets/loadingImages/l_img_9.jpg') },
    { id: 10, url: require('../../assets/loadingImages/l_img_10.jpg') },
    { id: 11, url: require('../../assets/loadingImages/l_img_11.jpg') },
    { id: 12, url: require('../../assets/loadingImages/l_img_12.jpg') },
    { id: 13, url: require('../../assets/loadingImages/l_img_13.jpg') },
    { id: 14, url: require('../../assets/loadingImages/l_img_14.jpg') },
    { id: 15, url: require('../../assets/loadingImages/l_img_15.jpg') },
    { id: 16, url: require('../../assets/loadingImages/l_img_16.jpg') },
];

const ImagesLoadingScreen = () => {
    const flatListRef = useRef<FlatList<unknown>>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const currentIndex = useRef(0);
    const opacityAnimated = useRef(new Animated.Value(1)).current;
    const { theme } = useTheme();
    const styles = createStyles(theme);

    useEffect(() => {
        const timer = setInterval(() => {
            if (images.length > 0) {
                currentIndex.current =
                    (currentIndex.current + 1) % images.length;
                opacityAnimated.setValue(1);

                Animated.sequence([
                    Animated.timing(opacityAnimated, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnimated, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();

                if (flatListRef.current) {
                    flatListRef.current.scrollToOffset({
                        offset: currentIndex.current * SCREEN_WIDTH,
                        animated: true,
                    });
                }
            }
        }, 3000);

        return () => clearInterval(timer);
    }, [opacityAnimated]);

    const keyExtractor = useCallback((item: ImagesType): string => {
        return item.id.toString();
    }, []);

    const onScroll = useMemo(
        () =>
            Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true },
            ),
        [scrollX],
    );

    const t = useTranslate();

    const renderItem = useCallback(
        ({ item, index }) => {
            const inputRange = [
                (index - 1) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ];

            const translateX = scrollX.interpolate({
                inputRange,
                outputRange: [SCREEN_WIDTH, 0, -SCREEN_WIDTH],
                extrapolate: 'clamp',
            });

            const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
            });

            return (
                <Animated.View
                    style={[
                        styles.imageContainer,
                        { opacity: opacityAnimated },
                    ]}
                >
                    <Animated.Image
                        source={item.url}
                        style={[styles.image, { transform: [{ scale }] }]}
                    />
                    <Animated.Text
                        style={[
                            styles.description,
                            {
                                transform: [{ translateX }],
                                opacity: opacityAnimated,
                            },
                        ]}
                    >
                        {t('imagesLoadingScreen.description')}
                    </Animated.Text>
                </Animated.View>
            );
        },
        [
            scrollX,
            styles.imageContainer,
            styles.image,
            styles.description,
            opacityAnimated,
            t,
        ],
    );

    const getItemLayout = useMemo(
        () => (data, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
        }),
        [],
    );

    if (images.length === 0) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                ref={flatListRef}
                data={shuffleArray(images)}
                keyExtractor={keyExtractor}
                horizontal
                pagingEnabled
                initialNumToRender={1}
                windowSize={3}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
            />
        </View>
    );
};

export default ImagesLoadingScreen;
