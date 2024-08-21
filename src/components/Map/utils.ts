import { LatLng } from 'react-native-maps';

export type ActivityLocation = {
    name: string;
    lat: number;
    lng: number;
};

export const getLocation = (location: ActivityLocation): LatLng => {
    return {
        latitude: location.lat,
        longitude: location.lng,
    };
};
export const getWaypoints = (activities: ActivityLocation[]): LatLng[] => {
    return activities.map((point) => getLocation(point));
};
