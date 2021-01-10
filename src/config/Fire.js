import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdeswls0rwChXpGs-pI6eP4qCzVI8IpIE",
    authDomain: "interview-gigs.firebaseapp.com",
    projectId: "interview-gigs",
    storageBucket: "interview-gigs.appspot.com",
    messagingSenderId: "312424313693",
    appId: "1:312424313693:web:117081cde9e21403f3eeb4",
    measurementId: "G-GRHP75NC38"
  };
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;