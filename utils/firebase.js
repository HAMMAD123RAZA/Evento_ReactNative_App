//  // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAtaBWiU8B_LuvueeIvnJQ37qrBMAEcObM",
//   authDomain: "eventoappexpo.firebaseapp.com",
//   projectId: "eventoappexpo",
//   storageBucket: "eventoappexpo.firebasestorage.app",
//   messagingSenderId: "433580690036",
//   appId: "1:433580690036:web:0c6303829c9c4f3e50df21"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db=getFirestore(app)
// export const storage=getStorage(app)
// export const auth=getAuth(app)

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtaBWiU8B_LuvueeIvnJQ37qrBMAEcObM",
  authDomain: "eventoappexpo.firebaseapp.com",
  projectId: "eventoappexpo",
  storageBucket: "eventoappexpo.appspot.com",
  messagingSenderId: "433580690036",
  appId: "1:433580690036:web:0c6303829c9c4f3e50df21"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);