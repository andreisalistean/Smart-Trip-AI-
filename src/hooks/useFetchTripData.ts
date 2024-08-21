import { useCallback, useState } from 'react';

import { get, ref } from 'firebase/database';
import { TripData } from 'store/types';

import { database } from '../../firebaseConfig';

export const useFetchTripData = () => {
    const [error, setError] = useState();
    const fetchTripData = useCallback(
        async (tripID: string) => {
            try {
                const snapshot = await get(ref(database, '/trips/' + tripID));
                const data = snapshot.val();
                return data as TripData;
            } catch (Error) {
                setError(error);
            }
        },
        [error],
    );

    return { fetchTripData, error };
};
