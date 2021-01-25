require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import {
  initFirebase,
  doSignInWithEmailAndPassword,
  doSignOut,
  getTheCurrentUser,
} from "./firebaseFunctions";

const app = express();
const port: number = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

initFirebase();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  doSignInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      res.send(user);
    })
    .catch(({ code, message }) => {
      res.send(`${code}: ${message}`);
    });
});

app.post("/api/signout", (req, res) => {
  doSignOut()
    .then(() => {
      res.send("signout");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/api/getTheCurrentUser", (req, res) => {
  res.send(getTheCurrentUser());
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
