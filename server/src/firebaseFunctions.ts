import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

import firebaseConfig from "./consts/firebaseConfig";
export default class FirebaseMethods {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // user related
  doSignInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = (): Promise<void> => this.auth.signOut();

  getTheCurrentUser = (): firebase.User | null => this.auth.currentUser;

  // data related
  // TODO: create document object for the newly created category
  createCategory = (name: string): Promise<void> =>
    this.db.collection("Categories").doc(name).set({});

  createProduct = () => {};

  getAllCategories = () => this.db.collection("Categories").get();

  getAllProductsOfACategory = (categoryName: string) =>
    this.db.collection("Products").where("kategori", "==", categoryName).get();
}
