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
  createADocument = (collection: string, document: string, setObject: object) =>
    this.db.collection(collection).doc(document).set(setObject);

  createCategory = (name: string): Promise<void> =>
    this.createADocument("Categories", name, {});

  createProduct = (
    isim: string,
    birim: string,
    kategori: string,
    olmasiGereken: number,
    stokMiktari: number,
    tedarikSuresi: string
  ): Promise<void> =>
    this.createADocument("Products", isim, {
      birim,
      kategori,
      olmasiGereken,
      stokMiktari,
      tedarikSuresi,
    });

  getAllDocumentsFromACollection = (collectionName: string) =>
    this.db.collection(collectionName).get();

  getAllCategories = () => this.getAllDocumentsFromACollection("Categories");

  getAllProducts = () => this.getAllDocumentsFromACollection("Products");

  getAllProductsOfACategory = (categoryName: string) =>
    this.db.collection("Products").where("kategori", "==", categoryName).get();
}
