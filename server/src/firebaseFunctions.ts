import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

import firebaseConfig from "./consts/firebaseConfig";
import { product } from "./interfaces";
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

  getAllDocumentsFromACollection = (collectionName: string) =>
    this.db.collection(collectionName).get();

  createCategory = (name: string): Promise<void> =>
    this.createADocument("Categories", name, {});

  createProduct = (body: product): Promise<void> =>
    this.createADocument("Products", body.isim, {
      birim: body.birim,
      kategori: body.kategori,
      olmasiGereken: body.olmasiGereken as number,
      stokMiktari: body.stokMiktari as number,
      tedarikSuresi: body.tedarikSuresi,
    });

  // update product and category

  getAllCategories = () => this.getAllDocumentsFromACollection("Categories");

  getAllProducts = () => this.getAllDocumentsFromACollection("Products");

  getAllProductsOfACategory = (categoryName: string) =>
    this.db.collection("Products").where("kategori", "==", categoryName).get();
}
