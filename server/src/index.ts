require("dotenv").config();
import firebase from "firebase";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import FirebaseFunctions from "./firebaseFunctions";

const app = express();
const port: number = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const firebaseFunctions = new FirebaseFunctions();

// Auth
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  firebaseFunctions
    .doSignInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user: any = userCredential.user;
      if (user) res.send(user.uid);
    })
    .catch(({ code, message }) => {
      res.status(404).send(`${code}: ${message}`);
    });
});

app.post("/api/signout", (req, res) => {
  firebaseFunctions
    .doSignOut()
    .then(() => {
      res.send("signout");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/api/getTheCurrentUser", (req, res) => {
  res.send(firebaseFunctions.getTheCurrentUser());
});

// Data
app.get("/api/getAllCategories", (req, res) => {
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

app.post("/api/createCategory", (req, res) => {
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

app.post("/api/createProduct", (req, res) => {
  firebaseFunctions
    .createProduct(req.body)
    .then(() => {
      res.send("product is created");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/api/getAllProductsOfACategory", (req, res) => {
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

app.post("/api/deleteProduct", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
