"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var firebaseFunctions_1 = __importDefault(require("../firebaseFunctions"));
var router = express_1.default.Router();
var firebaseFunctions = new firebaseFunctions_1.default();
// Data
router.get("/getAllCategories", function (req, res) {
    var categories = [];
    firebaseFunctions
        .getAllCategories()
        .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            categories.push(doc.id);
        });
        res.send(categories);
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/getAllProducts", function (req, res) {
    var q = req.body.q;
    var products = [];
    firebaseFunctions
        .getAllProducts()
        .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            products.push({
                isim: doc.id,
                kategori: doc.get("kategori"),
                stokMiktari: doc.get("stokMiktari"),
                olmasiGereken: doc.get("olmasiGereken"),
                birim: doc.get("birim"),
                tedarikSuresi: doc.get("tedarikSuresi"),
            });
        });
        products = products.filter(function (item) {
            return item.isim.toLowerCase().includes(q.toLowerCase());
        });
        res.send(products);
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/getAllProductsOfACategory", function (req, res) {
    var categoryName = req.body.categoryName;
    var products = [];
    firebaseFunctions
        .getAllProductsOfACategory(categoryName)
        .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            products.push({
                isim: doc.id,
                kategori: doc.get("kategori"),
                stokMiktari: doc.get("stokMiktari"),
                olmasiGereken: doc.get("olmasiGereken"),
                birim: doc.get("birim"),
                tedarikSuresi: doc.get("tedarikSuresi"),
            });
        });
        res.send(products);
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/getProduct", function (req, res) {
    var productName = req.body.productName;
    firebaseFunctions
        .getProduct(productName)
        .then(function (doc) {
        res.send(doc.data());
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/createCategory", function (req, res) {
    var name = req.body.name;
    firebaseFunctions
        .createCategory(name)
        .then(function () {
        res.send("Category is added");
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/createProduct", function (req, res) {
    firebaseFunctions
        .createProduct(req.body)
        .then(function () {
        res.send("product is created");
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/updateProduct", function (req, res) {
    var _a = req.body, isim = _a.isim, birim = _a.birim, kategori = _a.kategori, stokMiktari = _a.stokMiktari, tedarikSuresi = _a.tedarikSuresi, olmasiGereken = _a.olmasiGereken;
    var product = {
        birim: birim,
        kategori: kategori,
        stokMiktari: stokMiktari,
        tedarikSuresi: tedarikSuresi,
        olmasiGereken: olmasiGereken,
    };
    firebaseFunctions
        .updateProduct(isim, product)
        .then(function () {
        res.send("Document updated");
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/deleteProduct", function (req, res) {
    var productName = req.body.productName;
    firebaseFunctions
        .deleteProduct(productName)
        .then(function () {
        res.send("Product is deleted");
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.post("/deleteCategory", function (req, res) {
    var categoryName = req.body.categoryName;
    firebaseFunctions
        .deleteCategory(categoryName)
        .then(function () {
        res.send("Category is deleted");
    })
        .catch(function (error) {
        res.send(error);
    });
});
exports.default = router;
