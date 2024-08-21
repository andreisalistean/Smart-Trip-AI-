import React, { forwardRef, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { styles } from './style';
import { ActivityLocation, getLocation, getWaypoints } from './utils';
import { Colors } from '../../utils/colors';

type MapProps = {
    mapStyle?: StyleProp<ViewStyle>;
    mapContainerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    region: Region;
    trip?: ActivityLocation[];
    gradientColors?: string[];
};

export const Map = forwardRef<MapView, MapProps>(
    (
        {
            mapStyle: gradientStyle,
            mapContainerStyle,
            children,
            region,
            trip,
            gradientColors = [Colors.MAGENTA, Colors.PURPLE],
        },
        ref,
    ) => {
        const finalGradientStyle = useMemo(
            () => [styles.gradientBorder, gradientStyle],
            [gradientStyle],
        );
        const finalMapContainerStyle = useMemo(
            () => [styles.mapContainer, mapContainerStyle],
            [mapContainerStyle],
        );

        const origin = trip?.[0];
        const destination = trip?.[trip.length - 1];
        const waypoints = trip?.slice(1, -1);

        return (
            <LinearGradient colors={gradientColors} style={finalGradientStyle}>
                <View style={finalMapContainerStyle}>
                    <MapView
                        ref={ref}
                        style={styles.mapView}
                        initialRegion={region}
                    >
                        {children}
                        {trip && (
                            <>
                                {trip.map((location, index) => (
                                    <Marker
                                        key={`${index}${location.name}${location.lat}`}
                                        coordinate={getLocation(location)}
                                        title={location.name}
                                        image={
                                            location === origin
                                                ? require('../../assets/images/start_1.png')
                                                : location === destination
                                                  ? require('../../assets/images/finish_1.png')
                                                  : undefined
                                        }
                                    />
                                ))}
                                {origin && destination && waypoints && (
                                    <MapViewDirections
                                        origin={getLocation(origin)}
                                        destination={getLocation(destination)}
                                        waypoints={getWaypoints(waypoints)}
                                        apikey={
                                            process.env
                                                .EXPO_PUBLIC_GOOGLE_MAP_API_KEY
                                        }
                                        strokeColor={Colors.BRIGHT_PINK}
                                        strokeWidth={2}
                                    />
                                )}
                            </>
                        )}
                    </MapView>
                </View>
            </LinearGradient>
        );
    },
);
