import firebase from "firebase/compat/app";

firebase.initializeApp({
    apiKey: "AIzaSyAIUqTResh55cqf-VLca3YVI_f9RuhVHz4",
    authDomain: "graduation-project-f1f53.firebaseapp.com",
    projectId: "graduation-project-f1f53",
    storageBucket: "graduation-project-f1f53.appspot.com",
    messagingSenderId: "1052485363656",
    appId: "1:1052485363656:web:0b8ab8eae92aba73e702fd"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export {auth, firestore};