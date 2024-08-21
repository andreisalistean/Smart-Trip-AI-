import { useCallback, useState } from 'react';

import { ref, remove } from 'firebase/database';

import { database } from '../../firebaseConfig';
type Props = {
    userID: string;
    tripID: string;
};

const useDeleteTrips = () => {
    const [error, setError] = useState();
    const deleteTrip = useCallback(
        async ({ userID, tripID }: Props) => {
            try {
                await Promise.all([
                    remove(
                        ref(
                            database,
                            '/users/' + userID + '/userTripIDS' + tripID,
                        ),
                    ),
                    remove(ref(database, '/trips/' + tripID)),
                ]);
            } catch (Error) {
                setError(error);
            }
        },
        [error],
    );
    return { error, deleteTrip };
};

export default useDeleteTrips;
