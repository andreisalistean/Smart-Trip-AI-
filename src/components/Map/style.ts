import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapView: {
        flex: 1,
        width: '100%',
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        borderColor: 'transparent',
    },
    gradientBorder: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 25,
        padding: 5,
        overflow: 'hidden', // Padding to create the border effect
    },
});
