import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SearchBar from 'components/SearchBar';
import { Text } from 'components/Text';
import UserCard from 'components/UserCard';
import { useTheme } from 'context/ThemeContext';
import { FollowerData } from 'hooks/useFetchUserData';
import useFetchUserDataProfile from 'hooks/useFetchUserDataProfile';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';
import useTranslate from 'translations/useTranslate';

import createStyles from './style';

type SearchScreenNavigationProp =
    StackNavigationProp<MainNavigatorStackParamList>;

const SearchScreen = () => {
    const [input, setInput] = useState<string>('');
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [noUserError, setNoUserError] = useState<boolean>(false);
    const [results, setResults] = useState<FollowerData[]>([]);

    const allUsers = useFetchUserDataProfile();

    useEffect(() => {
        const trimmedInput = input.trim();
        if (trimmedInput && trimmedInput.length > 2) {
            const filteredUsers = allUsers.filter((item) => {
                return (
                    item.username
                        ?.toLowerCase()
                        .includes(trimmedInput.toLowerCase()) || false
                );
            });
            if (filteredUsers.length !== 0) {
                setNoUserError(false);
                setResults(filteredUsers);
            } else {
                setNoUserError(true);
                setResults([]);
            }
        } else {
            setNoUserError(false);
            setResults([]);
        }
    }, [input, allUsers]);

    const navigation = useNavigation<SearchScreenNavigationProp>();
    const goToProfile = useCallback(
        (id: string) => {
            navigation.getParent()?.navigate(ROUTE_KEYS.PROFILE_SCREEN, {
                userId: id,
                isProfileScreen: false,
            });
        },
        [navigation],
    );
    const renderItem = useCallback(
        ({ item }: { item: FollowerData }) => {
            return (
                <UserCard item={item} onPress={() => goToProfile(item.id)} />
            );
        },
        [goToProfile],
    );

    const keyExtractor = useCallback((item: FollowerData) => {
        return item.id;
    }, []);

    const t = useTranslate();

    return (
        <View style={styles.page}>
            <SearchBar inputString={input} setInput={setInput} />
            <View>
                {noUserError && (
                    <Text style={styles.noUserText}>
                        {t('searchScreen.user')} {`"${input.trim()}"`}{' '}
                        {t('searchScreen.notFound')}
                    </Text>
                )}
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    style={styles.results}
                />
            </View>
        </View>
    );
};

export default SearchScreen;
