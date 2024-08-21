import React from 'react';
import { TextInput, View } from 'react-native';

import { useTheme } from 'context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import useTranslate from 'translations/useTranslate';

import createStyles from './style';

type SearchBarProps = {
    inputString: string;
    setInput: (input: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ inputString, setInput }) => {
    const t = useTranslate();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            <Icon name="search" style={styles.icon} />
            <TextInput
                style={styles.textInput}
                placeholder={t('searchBar.placeholder')}
                onChangeText={setInput}
                value={inputString}
                placeholderTextColor={theme.PLACEHOLDER_TEXT}
            />
        </View>
    );
};

export default SearchBar;
