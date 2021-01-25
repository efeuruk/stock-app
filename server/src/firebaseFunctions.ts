import firebase from "firebase/app";
require("firebase/auth");

const initFirebase = (): void => {
  const firebaseConfig: Object = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);
};

const doSignInWithEmailAndPassword = (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  firebase.auth().signInWithEmailAndPassword(email, password);

const doSignOut = (): Promise<void> => firebase.auth().signOut();

const getTheCurrentUser = (): firebase.User | null =>
  firebase.auth().currentUser;

export {
  initFirebase,
  doSignInWithEmailAndPassword,
  doSignOut,
  getTheCurrentUser,
};
