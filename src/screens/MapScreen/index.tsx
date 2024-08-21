import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Map } from 'components/Map';
import { useTheme } from 'context/ThemeContext';
import {
    GooglePlaceData,
    GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { Marker } from 'react-native-maps';
import useTranslate from 'translations/useTranslate';

import createStyles from './style';

type ListItemType = {
    description?: string;
};

type CustomListItemProps = {
    item: ListItemType;
};

const CustomListItem: React.FC<CustomListItemProps> = ({ item }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.description}</Text>
        </View>
    );
};

const MapScreen = () => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const t = useTranslate();
    const mapRef = useRef(null);

    const dismissKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    const renderRow = useCallback((data: GooglePlaceData) => {
        return <CustomListItem item={data} />;
    }, []);

    const query = useMemo(
        () => ({
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
            language: 'en',
        }),
        [],
    );

    const finalStyleForGoogleMapsAutoComplete = useMemo(
        () => ({
            ...styles,
            listView: {
                ...styles.listView,
            },
        }),
        [styles],
    );

    const finalGradientColors = useMemo(
        () => ['transparent', 'transparent'],
        [],
    );

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [showResults, setShowResults] = useState(false);
    const [marker, setMarker] = useState(null);

    const handlePress = useCallback(
        (data, details) => {
            setShowResults(true);
            try {
                if (details?.geometry?.location) {
                    const location = {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    };

                    setRegion({
                        ...region,
                        latitude: location.latitude,
                        longitude: location.longitude,
                    });

                    setMarker(location);

                    if (mapRef.current) {
                        mapRef.current.animateToRegion(
                            {
                                ...region,
                                latitude: location.latitude,
                                longitude: location.longitude,
                            },
                            1000,
                        );
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        [region],
    );

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.autocompleteContainer}>
                    <GooglePlacesAutocomplete
                        placeholder={t('mapScreen.searchPlaceholder')}
                        fetchDetails={true}
                        debounce={1500}
                        onPress={handlePress}
                        isRowScrollable={true}
                        query={query}
                        styles={finalStyleForGoogleMapsAutoComplete}
                        renderRow={renderRow}
                        listViewDisplayed={showResults}
                    />
                </View>
                <Map
                    ref={mapRef}
                    mapStyle={styles.gradientFullView}
                    mapContainerStyle={styles.mapContainerFullView}
                    region={region}
                    gradientColors={finalGradientColors}
                >
                    {marker && <Marker coordinate={marker} />}
                </Map>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MapScreen;
