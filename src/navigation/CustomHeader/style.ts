import { StyleSheet } from 'react-native';

import { Theme } from 'utils/colors';

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        safe: {
            backgroundColor: theme.TAB_COLOR,
            flex: 1,
            marginBottom: 15,
        },
        view: {
            backgroundColor: theme.TAB_COLOR,
            width: '100%',
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
        },
        image: {
            marginTop: 18,
            width: 60,
            height: 60,
            right: 15,
        },
    });

export default createStyles;
