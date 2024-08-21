import React from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import ItineraryRecommendationDetails from 'components/ItineraryRecommendationDetails';
import { TripData } from 'store/types';

type RouteParams = {
    params: {
        trip: TripData;
        isRecommendation: boolean;
        navigatedFromProfile: boolean;
    };
};

const ItineraryDetailScreen = () => {
    const route = useRoute<RouteProp<RouteParams, 'params'>>();
    const { trip, isRecommendation, navigatedFromProfile } = route.params;

    return (
        <>
            <ItineraryRecommendationDetails
                trip={trip}
                isRecommendation={isRecommendation}
                navigatedFromProfile={navigatedFromProfile}
            ></ItineraryRecommendationDetails>
        </>
    );
};

export default ItineraryDetailScreen;
