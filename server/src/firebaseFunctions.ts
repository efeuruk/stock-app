import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

import firebaseConfig from "./consts/firebaseConfig";
import { product } from "./interfaces";

const COLLECTION_CATEGORIES = "Categories";
const COLLECTION_PRODUCTS = "Products";

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
    password: string,
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
    this.createADocument(COLLECTION_CATEGORIES, name, {});

  createProduct = (body: product): Promise<void> =>
    this.createADocument(COLLECTION_PRODUCTS, body.isim, {
      birim: body.birim,
      kategori: body.kategori,
      olmasiGereken: body.olmasiGereken as number,
      stokMiktari: body.stokMiktari as number,
      tedarikSuresi: body.tedarikSuresi,
    });

  deleteProduct = (name: string): Promise<void> =>
    this.db.collection(COLLECTION_PRODUCTS).doc(name).delete();

  // update product and category

  getAllCategories = () =>
    this.getAllDocumentsFromACollection(COLLECTION_CATEGORIES);

  getAllProducts = () =>
    this.getAllDocumentsFromACollection(COLLECTION_PRODUCTS);

  getAllProductsOfACategory = (categoryName: string) =>
    this.db
      .collection(COLLECTION_PRODUCTS)
      .where("kategori", "==", categoryName)
      .get();
}
