import express from "express";
import firebase from "firebase";
import FirebaseFunctions from "../firebaseFunctions";
import { productDoc } from "../interfaces";
const router = express.Router();
const firebaseFunctions = new FirebaseFunctions();

// Data
router.get("/getAllCategories", (req, res) => {
  let categories: string[] = [];
  firebaseFunctions
    .getAllCategories()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        categories.push(doc.id);
      });
      res.send(categories);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/getAllProducts", (req, res) => {
  const { q } = req.body;
  let products: firebase.firestore.DocumentData[] = [];
  firebaseFunctions
    .getAllProducts()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        products.push({
          isim: doc.id,
          kategori: doc.get("kategori"),
          stokMiktari: doc.get("stokMiktari"),
          olmasiGereken: doc.get("olmasiGereken"),
          birim: doc.get("birim"),
          tedarikSuresi: doc.get("tedarikSuresi"),
        });
      });
      products = products.filter((item) =>
        item.isim.toLowerCase().includes(q.toLowerCase()),
      );
      res.send(products);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/getAllProductsOfACategory", (req, res) => {
  const { categoryName } = req.body;
  let products: firebase.firestore.DocumentData[] = [];
  firebaseFunctions
    .getAllProductsOfACategory(categoryName)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
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
    .catch((error) => {
      res.send(error);
    });
});

router.post("/getProduct", (req, res) => {
  const { productName } = req.body;
  firebaseFunctions
    .getProduct(productName)
    .then((doc) => {
      res.send(doc.data());
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/createCategory", (req, res) => {
  const { name } = req.body;
  firebaseFunctions
    .createCategory(name)
    .then(() => {
      res.send("Category is added");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/createProduct", (req, res) => {
  firebaseFunctions
    .createProduct(req.body)
    .then(() => {
      res.send("product is created");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/updateProduct", (req, res) => {
  const {
    isim,
    birim,
    kategori,
    stokMiktari,
    tedarikSuresi,
    olmasiGereken,
  } = req.body;
  const product: productDoc = {
    birim,
    kategori,
    stokMiktari,
    tedarikSuresi,
    olmasiGereken,
  };
  firebaseFunctions
    .updateProduct(isim, product)
    .then(() => {
      res.send("Document updated");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/deleteProduct", (req, res) => {
  const { productName } = req.body;
  firebaseFunctions
    .deleteProduct(productName)
    .then(() => {
      res.send("Product is deleted");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post("/deleteCategory", (req, res) => {
  const { categoryName } = req.body;
  firebaseFunctions
    .deleteCategory(categoryName)
    .then(() => {
      res.send("Category is deleted");
    })
    .catch((error) => {
      res.send(error);
    });
});

export default router;
