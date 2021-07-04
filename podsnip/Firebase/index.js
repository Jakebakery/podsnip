import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDNB3SPLW6400WvjOGNXoxF9XxZao5Xub0",
    authDomain: "podsnip.firebaseapp.com",
    projectId: "podsnip",
    storageBucket: "podsnip.appspot.com",
    messagingSenderId: "45270082274",
    appId: "1:45270082274:web:1fd884b91f07794667f4bb",
    measurementId: "G-0Q9JXSV2F1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();

export { storage, firebase as default }