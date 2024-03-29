import firebase from "firebase/compat/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIUqTResh55cqf-VLca3YVI_f9RuhVHz4",
    authDomain: "graduation-project-f1f53.firebaseapp.com",
    projectId: "graduation-project-f1f53",
    storageBucket: "graduation-project-f1f53.appspot.com",
    messagingSenderId: "1052485363656",
    appId: "1:1052485363656:web:0b8ab8eae92aba73e702fd"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = getStorage(firebaseApp);

const usersRef = firestore.collection('users');
const messagesRef = firestore.collection('messages');
const privateRoomsRef = firestore.collection('private-rooms');
const groupsRef = firestore.collection('groups');

export {auth, firestore, storage, privateRoomsRef, usersRef, messagesRef, groupsRef};