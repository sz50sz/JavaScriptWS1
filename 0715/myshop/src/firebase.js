import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAX0n3DdQFZWwtZN7OXZfjGs0Q8zrHH3q4",
    authDomain: "react-ecsite-2057a.firebaseapp.com",
    projectId: "react-ecsite-2057a",
    storageBucket: "react-ecsite-2057a.firebasestorage.app",
    messagingSenderId: "434040708573",
    appId: "1:434040708573:web:6f600660cf35f5e2482a34"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);