import * as firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBrfDJULgypOCXTD-wEG1XPs9tC7VyfjRI",
    authDomain: "el-proveedor.firebaseapp.com",
    databaseURL: "https://el-proveedor.firebaseio.com",
    projectId: "el-proveedor",
    storageBucket: "el-proveedor.appspot.com",
    messagingSenderId: "757039733134",
    appId: "1:757039733134:web:2f57443fc23e0982"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = firebase.database();
