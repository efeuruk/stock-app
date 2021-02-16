"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("firebase/app"));
require("firebase/auth");
require("firebase/firestore");
var firebaseConfig_1 = __importDefault(require("./consts/firebaseConfig"));
var COLLECTION_CATEGORIES = "Categories";
var COLLECTION_PRODUCTS = "Products";
var FirebaseMethods = /** @class */ (function () {
    function FirebaseMethods() {
        var _this = this;
        // user related
        this.doSignInWithEmailAndPassword = function (email, password) {
            return _this.auth.signInWithEmailAndPassword(email, password);
        };
        this.doSignOut = function () { return _this.auth.signOut(); };
        this.getTheCurrentUser = function () { return _this.auth.currentUser; };
        // data related
        // General firebase helpers
        this.createADocument = function (collection, document, setObject) {
            return _this.db.collection(collection).doc(document).set(setObject);
        };
        this.getAllDocumentsFromACollection = function (collectionName) {
            return _this.db.collection(collectionName).get();
        };
        this.deleteACollection = function (collection, document) {
            return _this.db.collection(collection).doc(document).delete();
        };
        // Product related
        this.getAllCategories = function () { return _this.getAllDocumentsFromACollection(COLLECTION_CATEGORIES); };
        this.getAllProducts = function () { return _this.db.collection(COLLECTION_PRODUCTS).orderBy("kategori").get(); };
        this.getAllProductsOfACategory = function (categoryName) {
            return _this.db
                .collection(COLLECTION_PRODUCTS)
                .where("kategori", "==", categoryName)
                .get();
        };
        this.getProduct = function (productName) { return _this.db.collection(COLLECTION_PRODUCTS).doc(productName).get(); };
        this.createCategory = function (name) {
            return _this.createADocument(COLLECTION_CATEGORIES, name, {});
        };
        this.createProduct = function (body) {
            return _this.createADocument(COLLECTION_PRODUCTS, body.isim, {
                birim: body.birim,
                kategori: body.kategori,
                olmasiGereken: body.olmasiGereken,
                stokMiktari: body.stokMiktari,
                tedarikSuresi: body.tedarikSuresi,
            });
        };
        this.updateProduct = function (name, newDocFields) {
            return _this.db
                .collection(COLLECTION_PRODUCTS)
                .doc(name)
                .update({
                birim: newDocFields.birim,
                kategori: newDocFields.kategori,
                olmasiGereken: newDocFields.olmasiGereken,
                stokMiktari: newDocFields.stokMiktari,
                tedarikSuresi: newDocFields.tedarikSuresi,
            });
        };
        this.updateCategory = function (name) { };
        this.deleteProduct = function (name) {
            return _this.deleteACollection(COLLECTION_PRODUCTS, name);
        };
        this.deleteCategory = function (name) {
            return _this.deleteACollection(COLLECTION_CATEGORIES, name);
        };
        if (app_1.default.apps.length === 0)
            app_1.default.initializeApp(firebaseConfig_1.default);
        this.auth = app_1.default.auth();
        this.db = app_1.default.firestore();
    }
    return FirebaseMethods;
}());
exports.default = FirebaseMethods;
