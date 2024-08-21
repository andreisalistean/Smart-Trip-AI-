import { useCallback, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';

import useFetchUserData from './useFetchUserData';
import { auth } from '../../firebaseConfig';

export const useLogin = () => {
    const [error, setError] = useState<Error | null>(null);
    const [userId, setUserId] = useState('');
    const { fetchUserData } = useFetchUserData();
    const [loading, setLoading] = useState(false);

    enum returnCodes {
        'succes',
        'Could not get user data, pleate try again',
        'Invalid credentials\n¯\\_(ツ)_/¯',
        'Something whent wrong please try again \n¯\\_(ツ)_/¯',
        'Please enter a valid email address',
    }

    const storeData = useCallback(async (ID: string) => {
        try {
            await AsyncStorage.setItem('userData', ID);
        } catch (e) {
            // saving error
        }
    }, []);

    const login = useCallback(
        async (email: string, password: string): Promise<number> => {
            setLoading(true);
            try {
                const result = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );

                if (!(await fetchUserData(result.user.uid, true))) return 1;
                setUserId(result.user.uid);
                storeData(result.user.uid);
                return 0;
            } catch (error) {
                setError(error as Error);
                const authError = error as AuthError;
                if (authError.code == 'auth/invalid-credential') return 2;
                else if (authError.code == 'auth/invalid-email') return 4;
                else return 3;
            } finally {
                setLoading(false);
            }
        },
        [fetchUserData, storeData],
    );

    return { login, error, userId, returnCodes, loading };
};
