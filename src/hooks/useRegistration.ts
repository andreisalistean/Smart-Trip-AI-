import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { MainNavigatorStackParamList } from 'navigation/MainNavigator';
import { ROUTE_KEYS } from 'navigation/types';

import { useLogin } from './useLogin';
import { auth, database } from '../../firebaseConfig';

const useRegistration = () => {
    const [error, setError] = useState<Error | null>();
    const [Loading, setLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { login, loading } = useLogin();

    const nav =
        useNavigation<StackNavigationProp<MainNavigatorStackParamList>>();

    const createUser = useCallback(
        async (userID: string, name: string, email: string) => {
            try {
                const newUserRef = ref(database, '/users/' + userID);
                const userData = {
                    userName: name,
                    userEmail: email,
                    avatar: '',
                    userDescription: '',
                    userTrips: '',
                    followers: '',
                    following: '',
                };
                await set(newUserRef, userData);
                return true;
            } catch (error) {
                return false;
            }
        },
        [],
    );

    const handleRegistatration = useCallback(
        async (name: string, email: string, password: string) => {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredentials) => {
                    const user = userCredentials.user;
                    if (await createUser(user.uid, name, email)) {
                        if ((await login(email, password)) === 0) {
                            nav.replace(ROUTE_KEYS.TAB_NAVIGATOR);
                            Alert.alert('Succes', 'User added succesfully');
                        }
                    } else {
                        Alert.alert(
                            'Something went wrong',
                            'User coult not be added',
                        );
                    }
                })
                .catch((err) => {
                    setError(err);
                    const authErr = error as AuthError;
                    if (authErr.code == 'auth/email-already-in-use')
                        Alert.alert('Oops..', 'Email already in use');
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [createUser, error, nav],
    );

    return { error, handleRegistatration, Loading };
};
export default useRegistration;
