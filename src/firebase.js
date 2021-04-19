import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcAHzNTVSvgcEAVAx2ZcDhY1xYMhSTWb4",
    authDomain: "clone-363a3.firebaseapp.com",
    projectId: "clone-363a3",
    storageBucket: "clone-363a3.appspot.com",
    messagingSenderId: "373652254741",
    appId: "1:373652254741:web:0795b6011c14ad74de5e1c",
    measurementId: "G-4B2B7FS0WV"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {db,auth,provider,firebase};
