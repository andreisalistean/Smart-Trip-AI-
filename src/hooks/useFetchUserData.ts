import { useCallback, useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { get, onValue, ref } from 'firebase/database';
import { ROUTE_KEYS } from 'navigation/types';
import { useDispatch } from 'react-redux';
import { actions } from 'store/reducers/userDataReducer';
import { UserData } from 'store/types';

import { database } from '../../firebaseConfig';

export type FollowerData = {
    username: string;
    avatar: string;
    id: string;
};

const useFetchUserData = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<Error | null>();
    const [users, setUsers] = useState<FollowerData[]>([]);
    const [user, setUser] = useState<UserData>({
        id: '',
        userName: '',
        avatar: '',
        userDescription: '',
        userTrips: [],
        followers: [],
        following: [],
        userEmail: '',
    });

    const route = useRoute();

    const fetchUserData = useCallback(
        async (userID: string, isProfileScreen: boolean): Promise<boolean> => {
            try {
                const snapshot = await get(ref(database, '/users/' + userID));
                if (snapshot && snapshot.exists()) {
                    const user = snapshot.val();
                    const userData: UserData = {
                        id: userID,
                        userName: user.userName,
                        avatar: user.avatar,
                        userDescription: user.userDescription,
                        userTrips: user.userTrips,
                        followers: user.followers,
                        following: user.following,
                        userEmail: user.userEmail,
                    };

                    if (isProfileScreen) {
                        dispatch(actions.setAccount(userData));
                    }

                    setUser(userData);

                    return true;
                }
            } catch (error) {
                setError(error as Error);
            }
            return false;
        },
        [dispatch],
    );

    const getUsers = useCallback(async (usersIds: readonly string[]) => {
        setUsers([]);
        for (let i = 0; i < usersIds.length; i++) {
            try {
                const snapshot = await get(
                    ref(database, '/users/' + usersIds[i]),
                );
                if (snapshot && snapshot.exists()) {
                    const user = snapshot.val();
                    const newUser: FollowerData = {
                        id: usersIds[i],
                        username: user.userName,
                        avatar: user.avatar,
                    };
                    setUsers((users) => [...users, newUser]);
                }
            } catch (error) {
                setError(error as Error);
            }
        }
    }, []);

    useEffect(() => {
        if (user.id && route.name === ROUTE_KEYS.PROFILE_SCREEN) {
            const userRef = ref(database, '/users/' + user.id);
            const unsubscribe = onValue(userRef, (snapshot) => {
                if (snapshot && snapshot.exists()) {
                    const newUserData = snapshot.val();
                    const userData: UserData = {
                        id: user.id,
                        userName: newUserData.userName,
                        avatar: newUserData.avatar,
                        userDescription: newUserData.userDescription,
                        userTrips: newUserData.userTrips,
                        followers: newUserData.followers,
                        following: newUserData.following,
                        userEmail: newUserData.userEmail,
                    };
                    setUser(userData);
                }
            });

            return () => {
                unsubscribe();
            };
        }
    }, [user.id, route]);

    return { error, fetchUserData, getUsers, users, user };
};

export default useFetchUserData;
