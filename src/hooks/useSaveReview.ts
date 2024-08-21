import { useCallback, useState } from 'react';

import { get, ref, update } from 'firebase/database';
import { Review } from 'store/types';

import { database } from '../../firebaseConfig';

type ReviewProps = {
    tripId: string;
};

export const useSaveReview = ({ tripId }: ReviewProps) => {
    const [error, setError] = useState<Error>();

    const saveReview = useCallback(
        async (review: Review) => {
            try {
                const tripReference = ref(database, '/trips/' + tripId);
                const snapshot = await get(tripReference);
                if (snapshot && snapshot.exists()) {
                    const reviews = snapshot.val().reviews || [];
                    reviews.push(review);
                    update(tripReference, { reviews });
                }
            } catch (Error) {
                setError(Error as Error);
            }
        },
        [tripId],
    );

    return { error, saveReview };
};
