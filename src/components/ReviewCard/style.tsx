import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginVertical: 8,
        backgroundColor: Colors.DARK_PURPLE,
        borderRadius: 20,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.PURPLE,
        marginBottom: 4,
    },
    comment: {
        fontSize: 14,
        color: Colors.WHITE,
        padding: 10,
    },
    rating: {
        backgroundColor: Colors.DARK_PURPLE,
    },
    icons: {
        flexDirection: 'row',
        marginLeft: 250,
    },
    start: {
        flexDirection: 'row',
    },
});

export default styles;
