import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    cityListItem: {
        fontSize: 18,
        padding: 10,
        color: Colors.WHITE,
    },
});

export default styles;
