import { useEffect, useState } from 'react';

import { get, ref } from 'firebase/database';

import { FollowerData } from './useFetchUserData';
import { database } from '../../firebaseConfig';

const useFetchUserDataProfile = () => {
    const [data, setData] = useState<FollowerData[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const snapshot = await get(ref(database, 'users'));
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const usersArray: FollowerData[] = Object.keys(
                        usersData,
                    ).map((key) => ({
                        id: key,
                        username: usersData[key].userName,
                        avatar: usersData[key].avatar,
                    }));

                    setData(usersArray);
                }
            } catch (error) {
                console.error('Error fetching users data:', error);
            }
        };
        fetch();
    }, []);

    return data;
};

export default useFetchUserDataProfile;
