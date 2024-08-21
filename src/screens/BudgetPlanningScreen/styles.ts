import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

export const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
    },

    pieContainer: {
        flex: 1,
        alignSelf: 'center',
    },

    legendContainer: {
        marginTop: 20,
        justifyContent: 'space-evenly',
    },

    legendText: {
        color: Colors.WHITE,
    },

    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: Colors.BACKGROUND_DARK,
    },

    titleContainer: {
        backgroundColor: Colors.DARK_PURPLE,
        padding: 24,
        borderRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 20,
    },

    title: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.WHITE,
    },

    categoryContainer: {
        marginBottom: 15,
    },
    categoryLabel: {
        fontSize: 18,
        marginBottom: 5,
        color: Colors.WHITE,
    },
    categoryInput: {
        fontSize: 16,
        color: Colors.WHITE,
    },
    saveButton: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    saveButtonText: {
        color: Colors.WHITE,
        fontSize: 18,
        alignSelf: 'center',
    },
});
