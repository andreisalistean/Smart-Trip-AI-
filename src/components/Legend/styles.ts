import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

export const styles = StyleSheet.create({
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    colorBox: {
        width: 20,
        height: 20,
        marginRight: 8,
        borderRadius: 10,
    },
    legendText: {
        fontSize: 14,
        color: Colors.WHITE,
    },
});
