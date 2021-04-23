import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwm8lEt6p03OrB9_nCCKcIdQ1u4mK_pxg",
  authDomain: "product-mgt.firebaseapp.com",
  projectId: "product-mgt",
  storageBucket: "product-mgt.appspot.com",
  messagingSenderId: "724744487598",
  appId: "1:724744487598:web:101281ac643bd55f62e33f",
  measurementId: "G-P6CYB9GB0S",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
