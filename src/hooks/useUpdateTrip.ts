import { useCallback, useState } from 'react';

import { ref, update } from 'firebase/database';
import { TripData } from 'store/types';

import { database } from '../../firebaseConfig';

const useUpdateTrip = () => {
    const [error, setError] = useState();
    const updateTrip = useCallback(
        async (tripData: TripData) => {
            try {
                await update(ref(database, '/trips/' + tripData.id), {
                    ...tripData,
                });
            } catch (Error) {
                setError(error);
            }
        },
        [error],
    );
    return { error, updateTrip };
};

export default useUpdateTrip;
