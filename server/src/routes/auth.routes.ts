import express from "express";
import FirebaseFunctions from "../firebaseFunctions";
const router = express.Router();
const firebaseFunctions = new FirebaseFunctions();

router.post("/login", (req, res) => {
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

router.post("/signout", (req, res) => {
  firebaseFunctions
    .doSignOut()
    .then(() => {
      res.send("signout");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/getTheCurrentUser", (req, res) => {
  res.send(firebaseFunctions.getTheCurrentUser());
});

export default router;
