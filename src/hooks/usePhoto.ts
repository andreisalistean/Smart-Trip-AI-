import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { ref, update } from 'firebase/database';
import {
    deleteObject,
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from 'firebase/storage';
import { useDispatch } from 'react-redux';

import { database, storage } from '../../firebaseConfig';

const usePhoto = (
    initialImageUrl: string,
    entityId: string,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateEntityAction: any,
    folderPath: string,
    databasePath: string,
    fieldPath: string,
) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl || '');
    const dispatch = useDispatch();

    const pickImage = useCallback(async () => {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission required',
                    'We need permission to access your photos.',
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedUri = result.assets[0].uri;
                const oldImagePath = initialImageUrl
                    ? decodeURIComponent(
                          initialImageUrl.split('/o/')[1].split('?')[0],
                      )
                    : `${folderPath}/${entityId}.jpg`;

                if (initialImageUrl) {
                    const oldImageRef = storageRef(storage, oldImagePath);
                    try {
                        await deleteObject(oldImageRef);
                    } catch (deleteError) {
                        console.error(deleteError);
                    }
                }

                const response = await fetch(selectedUri);
                const blob = await response.blob();
                const newImagePath = `${folderPath}/${entityId}.jpg`;
                const newImageRef = storageRef(storage, newImagePath);
                await uploadBytes(newImageRef, blob);

                const newImageUrl = await getDownloadURL(newImageRef);
                setImageUrl(newImageUrl);

                const entityRef = ref(database, `${databasePath}/${entityId}`);
                await update(entityRef, { [fieldPath]: newImageUrl });

                setImageUrl(newImageUrl);
                dispatch(updateEntityAction({ [fieldPath]: newImageUrl }));
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    }, [
        initialImageUrl,
        folderPath,
        entityId,
        databasePath,
        fieldPath,
        dispatch,
        updateEntityAction,
    ]);

    return { pickImage, imageUrl };
};

export default usePhoto;
