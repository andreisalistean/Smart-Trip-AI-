import { StyleSheet } from 'react-native';

import { Colors } from 'utils/colors';

const styles = StyleSheet.create({
    safeAreaStyle: { flex: 1 },
    container: {
        backgroundColor: Colors.BACKGROUND_DARK,
    },
    gradient: {
        marginHorizontal: 8,
        marginTop: 58,
        borderRadius: 16,
        alignItems: 'center',
        height: 250,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    photo: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
        overflow: 'hidden',
    },

    tripDetails: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    detail: {
        fontSize: 18,
        marginTop: 10,
        color: Colors.WHITE,
        opacity: 0.9,
    },
    dayContainer: {
        marginTop: 20,
    },
    dayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE,
        paddingLeft: 20,
    },
    cityContainer: {
        marginTop: 10,
    },
    cityName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        paddingLeft: 20,
    },
    activityContainer: {
        marginTop: 10,
    },
    activityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.WHITE,
    },
    activityDescription: {
        fontSize: 14,
        color: Colors.WHITE,
    },
    locationName: {
        fontSize: 14,
        fontStyle: 'italic',
        color: Colors.WHITE,
    },
    reviewsSection: {
        padding: 20,
        backgroundColor: Colors.BACKGROUND_DARK,
    },
    reviewsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.WHITE,
        marginBottom: 10,
    },
    tripImageEditButton: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        backgroundColor: Colors.DARK_GREY,
        borderRadius: 50,
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        color: Colors.WHITE,
        overflow: 'hidden',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    mapContainer: {
        flex: 1,
        borderRadius: 16,
    },
    mapComponentContainer: {
        width: '100%',
        height: '10%',
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    modalHeader: {
        backgroundColor: Colors.WHITE,
        zIndex: 1,
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        top: '5%',
        borderRadius: 30,
    },
    mapComponentTouchable: {
        flex: 1,
        height: 200,
        margin: 10,
    },

    scrollViewContainerStyle: { paddingBottom: 15 },
    swipeButtonRailStyle: {
        backgroundColor: Colors.MID_GREY,
        opacity: 0.7,
    },
    viewReview: {
        backgroundColor: Colors.DARK_GREY,
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    authorReview: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    ratingReview: {
        color: Colors.WHITE,
    },
    icons: {
        margin: 4,
        color: Colors.MAGENTA,
    },
    viewRating: {
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        padding: 5,
    },
    textReview: {
        color: Colors.WHITE,
    },
    headerReview: {
        flexDirection: 'row',
        padding: 4,
        marginBottom: 15,
    },
    sort: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    viewSort: {
        backgroundColor: Colors.DARK_GREY,
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    textSortBtn: {
        color: Colors.WHITE,
        fontSize: 13,
        fontWeight: 'bold',
    },
    sortBtn: {
        margin: 10,
        padding: 4,
        backgroundColor: Colors.SOFT_BLACK,
        borderRadius: 5,
    },
    selectedSortBtn: {
        marginLeft: 15,
        margin: 10,
        padding: 4,
        backgroundColor: Colors.MAGENTA,
        borderRadius: 5,
    },
    star: {
        padding: 13,
    },
    addToMyTrips: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-between',
        margin: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Colors.MID_PINK,
    },
    addToMyTripsText: {
        textAlign: 'center',
        margin: 10,
        width: '100%',
        color: Colors.WHITE,
    },
    dateModalBackground: {
        flex: 1,
        backgroundColor: Colors.SEMI_TRANSPARENT_BG,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateModalContainer: {
        flexDirection: 'column',
        backgroundColor: Colors.BACKGROUND_DARK,
        borderRadius: 10,
        padding: 20,
        width: '85%',
        alignItems: 'center',
    },
    modalMessage: {
        flex: 1,
        marginBottom: 20,
        fontSize: 16,
        color: Colors.WHITE,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: Colors.LIGHT_GREY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    inactiveButton: {
        marginTop: 20,
        backgroundColor: Colors.GREY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    exitButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: Colors.RED,
    },
    exitButtonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    addToMyTripsImage: {
        height: 20,
        width: 20,
    },
    budgetModalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    budgetModalContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    budgetModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    budgetModalInput: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    budgetModalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    budgetModalButton: {
        padding: 10,
        backgroundColor: Colors.MAGENTA,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    budgetModalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    styleFilter: {
        flexDirection: 'row',
    },
    linearGradientModalContainer: {
        flex: 1,
    },
    viewSaveTripButton: {
        alignItems: 'center',
        margin: 10,
    },
    headerModalDatePicker: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
export default styles;
