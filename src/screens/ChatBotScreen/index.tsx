import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { OpenAI } from 'openai';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useTranslate from 'translations/useTranslate';
import { Colors } from 'utils/colors';

import { styles } from './styles';

type Message = {
    _id: string;
    text: string;
    createdAt: Date;
    user: { _id: string; name: string; avatar: string };
};

const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPEN_AI_KEY as string,
});

const ASSISTANT_ROLE =
    "You are an expert tour guide, you traveled all around the world and give amazing advice to travelers. You know the best places, restaurants, activites to do. Don't use markdowns or text styling when answering, things like **TEXT**, just use normal styling like newlines etc.";

const ChatBotScreen: React.FC = () => {
    const t = useTranslate();
    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation();

    const dot1Anim = useRef(new Animated.Value(0)).current;
    const dot2Anim = useRef(new Animated.Value(0)).current;
    const dot3Anim = useRef(new Animated.Value(0)).current;

    const gradientColors = useMemo(
        () => [Colors.DARK_PURPLE, Colors.PURPLE, Colors.BACKGROUND_DARK],
        [],
    );

    const keyExtractor = useCallback((item: Message) => item._id, []);

    const AI_USER = useMemo(
        () => ({
            _id: 'ai',
            name: 'ChatGPT',
            avatar: require('../../../assets/openai.png'),
        }),
        [],
    );

    const CURRENT_USER = useMemo(
        () => ({
            _id: 'user',
            name: 'User',
            avatar: userData.avatar,
        }),
        [userData.avatar],
    );

    useEffect(() => {
        setMessages([
            {
                _id: String(Math.random()),
                text: t('chatBotScreen.messages.welcome'),
                createdAt: new Date(),
                user: AI_USER,
            },
        ]);
    }, [AI_USER, CURRENT_USER, t]);

    const bounceAnimation = Animated.loop(
        Animated.sequence([
            Animated.timing(dot1Anim, {
                toValue: -7,
                duration: 110,
                useNativeDriver: true,
            }),
            Animated.timing(dot1Anim, {
                toValue: 0,
                duration: 110,
                useNativeDriver: true,
            }),
            Animated.timing(dot2Anim, {
                toValue: -8,
                duration: 110,
                useNativeDriver: true,
            }),
            Animated.timing(dot2Anim, {
                toValue: 0,
                duration: 110,
                useNativeDriver: true,
            }),
            Animated.timing(dot3Anim, {
                toValue: -9,
                duration: 110,
                useNativeDriver: true,
            }),
            Animated.timing(dot3Anim, {
                toValue: 0,
                duration: 110,
                useNativeDriver: true,
            }),
        ]),
    );

    const resetDotsAnimation = Animated.parallel([
        Animated.timing(dot1Anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }),
        Animated.timing(dot2Anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }),
        Animated.timing(dot3Anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }),
    ]);

    useEffect(() => {
        if (isLoading) {
            bounceAnimation.start();
        } else {
            bounceAnimation.stop();
            resetDotsAnimation.start();
        }
    }, [isLoading, bounceAnimation, resetDotsAnimation]);

    const handleSend = useCallback(async () => {
        if (inputText.trim().length === 0) return;

        const newMessages: Message[] = [
            {
                _id: String(Math.random()),
                text: inputText,
                createdAt: new Date(),
                user: CURRENT_USER,
            },
        ];

        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
        setInputText('');

        try {
            setIsLoading(true);
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: ASSISTANT_ROLE },
                    { role: 'user', content: inputText },
                ],
                max_tokens: 650,
            });

            const aiMessage: string = response.choices[0].message.content;
            if (aiMessage) {
                setIsLoading(false);
                setMessages((prevMessages) => [
                    {
                        _id: String(Math.random()),
                        text: aiMessage,
                        createdAt: new Date(),
                        user: {
                            _id: 'ai',
                            name: 'ChatGPT',
                            avatar: require('../../../assets/openai.png'),
                        },
                    },
                    ...prevMessages,
                ]);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }, [inputText, CURRENT_USER]);

    const renderItem = useCallback(
        ({ item }: { item: Message }) => (
            <View
                style={
                    item.user._id === 'ai'
                        ? styles.aiMessage
                        : styles.userMessage
                }
            >
                <Image
                    source={
                        item.user._id === 'ai'
                            ? require('../../../assets/openai.png')
                            : { uri: userData.avatar }
                    }
                    style={
                        item.user._id === 'ai'
                            ? styles.avatarAI
                            : styles.avatarUser
                    }
                />
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        ),
        [userData.avatar],
    );

    const handleGoBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const animatedDots = useMemo(
        () => (
            <View style={styles.loadingDots}>
                <Animated.View
                    style={[
                        styles.dot,
                        { transform: [{ translateY: dot1Anim }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.dot,
                        { transform: [{ translateY: dot2Anim }] },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.dot,
                        { transform: [{ translateY: dot3Anim }] },
                    ]}
                />
            </View>
        ),
        [dot1Anim, dot2Anim, dot3Anim],
    );

    const contentContainerStyle = useMemo(
        () => ({
            flex: 1,
            backgroundColor: Colors.BACKGROUND_DARK,
        }),
        [],
    );

    return (
        <ScrollView
            scrollEnabled={false}
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={contentContainerStyle}
        >
            <LinearGradient colors={gradientColors} style={styles.mainCont}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text></Text>
                        <Text style={styles.headerTitle}>
                            {t('chatBotScreen.titles.chatWithAI')}
                        </Text>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Icon
                                name="close"
                                size={27}
                                color={Colors.WHITE}
                                style={styles.back}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        inverted
                    />
                    {isLoading && (
                        <View style={styles.loadingContainer}>
                            <Image
                                source={require('../../../assets/openai.png')}
                                style={styles.loadingAvatar}
                            />
                            {animatedDots}
                        </View>
                    )}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder={t(
                                'chatBotScreen.placeholders.typeMessage',
                            )}
                            placeholderTextColor={Colors.WHITE}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendButton}
                        >
                            <Text style={styles.sendButtonText}>
                                {t('chatBotScreen.buttons.send')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default ChatBotScreen;
