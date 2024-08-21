import { useCallback, useState } from 'react';

import { get, push, ref, set, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { TripData } from 'store/types';

import { database } from '../../firebaseConfig';

const useSaveItineraries = () => {
    const [error, setError] = useState<Error>();
    const userData = useSelector(
        (state: RootState) => state.userDataReducer.userData,
    );
    const saveItineraries = useCallback(
        async (tripData: TripData, isRec = false) => {
            try {
                const reference = push(ref(database, '/trips'));
                if (isRec) {
                    tripData.createdBy = userData.id;
                    await set(reference, tripData);
                }
                const userReference = ref(database, '/users/' + userData.id);
                const snapshot = await get(userReference);
                if (snapshot && snapshot.exists()) {
                    const userData = snapshot.val();
                    const userTrips = userData.userTrips || [];
                    userTrips.push(tripData);
                    update(userReference, { userTrips });
                }
            } catch (Error) {
                setError(Error as Error);
            }
        },
        [userData.id],
    );

    return { error, saveItineraries };
};

export default useSaveItineraries;
