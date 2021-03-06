import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAK4GPvmza_CK8ipcOJf8vao7lMzYwsWXc",
    authDomain: "catch-of-the-day-sarah-1.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-sarah-1-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export {firebaseApp};

//This is a default export
export default base;