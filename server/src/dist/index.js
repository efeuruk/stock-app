"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
var firebaseFunctions_1 = __importDefault(require("./firebaseFunctions"));
var app = express_1.default();
var port = process.env.PORT || 3001;
var staticFileMiddleware = express_1.default.static("./frontend/dist");
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(staticFileMiddleware);
app.use(connect_history_api_fallback_1.default({
    disableDotRule: true,
    verbose: true,
}));
app.use(staticFileMiddleware);
var firebaseFunctions = new firebaseFunctions_1.default();
// Auth
app.post("/api/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    firebaseFunctions
        .doSignInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
        // Signed in
        var user = userCredential.user;
        if (user)
            res.send(user.uid);
    })
        .catch(function (_a) {
        var code = _a.code, message = _a.message;
        res.status(404).send(code + ": " + message);
    });
});
app.post("/api/signout", function (req, res) {
    firebaseFunctions
        .doSignOut()
        .then(function () {
        res.send("signout");
    })
        .catch(function (error) {
        res.send(error);
    });
});
app.get("/api/getTheCurrentUser", function (req, res) {
    res.send(firebaseFunctions.getTheCurrentUser());
});
// Data
app.get("/api/getAllCategories", function (req, res) {
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
app.post("/api/getAllProducts", function (req, res) {
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
app.post("/api/getAllProductsOfACategory", function (req, res) {
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
app.post("/api/getProduct", function (req, res) {
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
app.post("/api/createCategory", function (req, res) {
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
app.post("/api/createProduct", function (req, res) {
    firebaseFunctions
        .createProduct(req.body)
        .then(function () {
        res.send("product is created");
    })
        .catch(function (error) {
        res.send(error);
    });
});
app.post("/api/updateProduct", function (req, res) {
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
app.post("/api/deleteProduct", function (req, res) {
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
app.post("/api/deleteCategory", function (req, res) {
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
app.listen(port, function () {
    console.log("Server started on " + port);
});
