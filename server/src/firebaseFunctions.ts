import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

import firebaseConfig from "./consts/firebaseConfig";
import { product, productDoc } from "./interfaces";

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

  // General firebase helpers
  createADocument = (collection: string, document: string, setObject: object) =>
    this.db.collection(collection).doc(document).set(setObject);

  getAllDocumentsFromACollection = (collectionName: string) =>
    this.db.collection(collectionName).get();

  deleteACollection = (collection: string, document: string) =>
    this.db.collection(collection).doc(document).delete();

  // Product related
  getAllCategories = (): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > => this.getAllDocumentsFromACollection(COLLECTION_CATEGORIES);

  getAllProducts = (): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > => this.db.collection(COLLECTION_PRODUCTS).orderBy("kategori").get();

  getAllProductsOfACategory = (
    categoryName: string,
  ): Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  > =>
    this.db
      .collection(COLLECTION_PRODUCTS)
      .where("kategori", "==", categoryName)
      .get();

  getProduct = (
    productName: string,
  ): Promise<
    firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  > => this.db.collection(COLLECTION_PRODUCTS).doc(productName).get();

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

  updateProduct = (name: string, newDocFields: productDoc): Promise<void> =>
    this.db
      .collection(COLLECTION_PRODUCTS)
      .doc(name)
      .update({
        birim: newDocFields.birim,
        kategori: newDocFields.kategori,
        olmasiGereken: newDocFields.olmasiGereken as number,
        stokMiktari: newDocFields.stokMiktari as number,
        tedarikSuresi: newDocFields.tedarikSuresi,
      });

  updateCategory = (name: string) => {};

  deleteProduct = (name: string): Promise<void> =>
    this.deleteACollection(COLLECTION_PRODUCTS, name);

  deleteCategory = (name: string): Promise<void> =>
    this.deleteACollection(COLLECTION_CATEGORIES, name);
}
