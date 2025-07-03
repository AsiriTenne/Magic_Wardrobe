import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAam4vNH60Bvoouwv-wTpCCqD-VGGXkAck",
  authDomain: "spm-search-and-cart.firebaseapp.com",
  projectId: "spm-search-and-cart",
  storageBucket: "spm-search-and-cart.appspot.com",
  messagingSenderId: "531835773910",
  appId: "1:531835773910:web:8cf60a4af9499f987efa77",
  measurementId: "G-T72Q7E2S0Y"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth,fs,storage}



// my firebase config start

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAam4vNH60Bvoouwv-wTpCCqD-VGGXkAck",
//   authDomain: "spm-search-and-cart.firebaseapp.com",
//   projectId: "spm-search-and-cart",
//   storageBucket: "spm-search-and-cart.appspot.com",
//   messagingSenderId: "531835773910",
//   appId: "1:531835773910:web:8cf60a4af9499f987efa77",
//   measurementId: "G-T72Q7E2S0Y"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// my firebase config end



//original firebase config start



// import firebase from 'firebase'
// import 'firebase/auth'
// import 'firebase/firestore'
// import 'firebase/storage'

// const firebaseConfig = {
//     apiKey: "AIzaSyDq_WRJbnZtWnSxqbV_kl-ZZS8DVnhy6wg",
//     authDomain: "ecommerce-app-with-react-hooks.firebaseapp.com",
//     projectId: "ecommerce-app-with-react-hooks",
//     storageBucket: "ecommerce-app-with-react-hooks.appspot.com",
//     messagingSenderId: "719037100374",
//     appId: "1:719037100374:web:6c6091a610ce02b3a766f7",
//     measurementId: "G-ZN4GN3FPP7"
//   };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const fs = firebase.firestore();
// const storage = firebase.storage();

// export {auth,fs,storage}


// original firebase config end