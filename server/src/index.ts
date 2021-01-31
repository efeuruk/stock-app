require("dotenv").config();
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

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
