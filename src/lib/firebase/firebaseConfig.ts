import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD5JyjkBwvLkY53oqVeX2R9OvB7mtgZ_t0",
    authDomain: "smart-sensor-d771a.firebaseapp.com",
    databaseURL: "https://smart-sensor-d771a-default-rtdb.firebaseio.com",
    projectId: "smart-sensor-d771a",
    storageBucket: "smart-sensor-d771a.appspot.com",
    messagingSenderId: "997183740649",
    appId: "1:997183740649:web:4cf64817659d29f24eee78"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export const firestoreDevices = firestore.collection('equipments');

export const firestoreHistoryByDevice = (id: string) => firestore.collection(`equipments/${id}/history`);

export const firestoreNotificationHistory = () => firestore.collection('notifications')