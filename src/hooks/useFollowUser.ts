import { useCallback, useState } from 'react';

import { get, ref, set, update } from 'firebase/database';
import { ENDPOINTS } from 'utils/utils';

import { database } from '../../firebaseConfig';

interface UseFollowUserResult {
    isFollowing: boolean;
    followUser: () => Promise<void>;
    unfollowUser: () => Promise<void>;
    fetchFollowStatus: () => void;
    loading: boolean;
    error: string | null;
}

const useFollowUser = (
    currentUserId: string,
    followUserId: string,
): UseFollowUserResult => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const ensureDataExists = useCallback(
        async (userId: string, type: ENDPOINTS) => {
            const userRef = ref(database, `users/${userId}/${type}`);
            const snapshot = await get(userRef);
            if (!snapshot.exists() || typeof snapshot.val() === 'string') {
                await set(userRef, ['placeholder']);
            }
        },
        [],
    );

    const fetchFollowStatus = useCallback(async () => {
        try {
            setLoading(true);
            await ensureDataExists(currentUserId, ENDPOINTS.FOLLOWING);
            const currentUserRef = ref(
                database,
                `users/${currentUserId}/${ENDPOINTS.FOLLOWING}`,
            );
            const snapshot = await get(currentUserRef);
            if (snapshot.exists()) {
                const followingList = snapshot.val() || [];
                const temp = followingList.includes(followUserId);
                setIsFollowing(temp);
            }
        } catch (err) {
            setError('FetchStatus: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [currentUserId, followUserId, ensureDataExists]);

    const followUser = useCallback(async () => {
        try {
            setLoading(true);

            await Promise.all([
                ensureDataExists(currentUserId, ENDPOINTS.FOLLOWING),
                ensureDataExists(followUserId, ENDPOINTS.FOLLOWERS),
            ]);

            const currentUserRef = ref(
                database,
                `users/${currentUserId}/${ENDPOINTS.FOLLOWING}`,
            );
            const followUserRef = ref(
                database,
                `users/${followUserId}/${ENDPOINTS.FOLLOWERS}`,
            );

            const [currentUserSnapshot, followUserSnapshot] = await Promise.all(
                [get(currentUserRef), get(followUserRef)],
            );

            if (currentUserSnapshot.exists() && followUserSnapshot.exists()) {
                let currentUserFollowing = currentUserSnapshot.val() || [];
                let followUserFollowers = followUserSnapshot.val() || [];

                if (
                    currentUserFollowing.length === 1 &&
                    currentUserFollowing.includes('placeholder')
                ) {
                    currentUserFollowing = [];
                }
                if (
                    followUserFollowers.length === 1 &&
                    followUserFollowers.includes('placeholder')
                ) {
                    followUserFollowers = [];
                }

                const updatedUserFollowing = [
                    ...currentUserFollowing,
                    followUserId,
                ];
                const updatedUserFollowers = [
                    ...followUserFollowers,
                    currentUserId,
                ];

                await update(ref(database, `users/${currentUserId}`), {
                    following: updatedUserFollowing,
                });
                await update(ref(database, `users/${followUserId}`), {
                    followers: updatedUserFollowers,
                });

                setIsFollowing(true);
            }
        } catch (err) {
            setError('Failed to follow user: ' + err);
        } finally {
            setLoading(false);
        }
    }, [currentUserId, followUserId, ensureDataExists]);

    const unfollowUser = useCallback(async () => {
        try {
            setLoading(true);

            await Promise.all([
                ensureDataExists(currentUserId, ENDPOINTS.FOLLOWING),
                ensureDataExists(followUserId, ENDPOINTS.FOLLOWERS),
            ]);

            const currentUserRef = ref(
                database,
                `users/${currentUserId}/${ENDPOINTS.FOLLOWING}`,
            );
            const followUserRef = ref(
                database,
                `users/${followUserId}/${ENDPOINTS.FOLLOWERS}`,
            );

            const [currentUserSnapshot, followUserSnapshot] = await Promise.all(
                [get(currentUserRef), get(followUserRef)],
            );

            if (currentUserSnapshot.exists() && followUserSnapshot.exists()) {
                let currentUserFollowing = currentUserSnapshot.val() || [];
                let followUserFollowers = followUserSnapshot.val() || [];

                if (
                    currentUserFollowing.length === 1 &&
                    currentUserFollowing.includes('placeholder')
                ) {
                    currentUserFollowing = [];
                }
                if (
                    followUserFollowers.length === 1 &&
                    followUserFollowers.includes('placeholder')
                ) {
                    followUserFollowers = [];
                }

                const updatedUserFollowing = currentUserFollowing.filter(
                    (id: string) => id !== followUserId,
                );
                const updatedUserFollowers = followUserFollowers.filter(
                    (id: string) => id !== currentUserId,
                );

                await update(ref(database, `users/${currentUserId}`), {
                    following: updatedUserFollowing,
                });
                await update(ref(database, `users/${followUserId}`), {
                    followers:
                        updatedUserFollowers.length !== 0
                            ? updatedUserFollowers
                            : '',
                });

                setIsFollowing(false);
            }
        } catch (err) {
            setError('Failed to unfollow user: ' + err);
        } finally {
            setLoading(false);
        }
    }, [currentUserId, followUserId, ensureDataExists]);

    return {
        isFollowing,
        followUser,
        unfollowUser,
        fetchFollowStatus,
        loading,
        error,
    };
};

export default useFollowUser;
