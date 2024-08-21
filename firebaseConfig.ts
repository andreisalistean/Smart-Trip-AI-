// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBpCOSorQ16LN5hoGUHFZcRAOtvPV_ylDc',
    authDomain: 'smarttripai.firebaseapp.com',
    projectId: 'smarttripai',
    storageBucket: 'smarttripai.appspot.com',
    messagingSenderId: '368844786284',
    appId: '1:368844786284:web:5cfb40dfecc65e1b492649',
    databaseURL:
        'https://smarttripai-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// eslint-disable-next-line import/no-unused-modules
export { storage, auth, database };
