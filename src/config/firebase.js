import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDTvHDJ_z2VaRHVyZi0mgSV0BtjtdcCTT0",
    authDomain: "food-delivery-app-125.firebaseapp.com",
    databaseURL: "https://food-delivery-app-125.firebaseio.com",
    projectId: "food-delivery-app-125",
    storageBucket: "food-delivery-app-125.appspot.com",
    messagingSenderId: "347813563924",
    appId: "1:347813563924:web:4d5b3682c498f4f5"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;