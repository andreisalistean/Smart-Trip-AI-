import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

export const styles = StyleSheet.create({
    chartContainer: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
    },
    pieContainer: {
        maxWidth: 170,
    },
    legendContainer: {
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    legendText: {
        color: Colors.WHITE,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
