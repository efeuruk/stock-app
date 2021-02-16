"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var firebaseFunctions_1 = __importDefault(require("../firebaseFunctions"));
var router = express_1.default.Router();
var firebaseFunctions = new firebaseFunctions_1.default();
router.post("/login", function (req, res) {
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
router.post("/signout", function (req, res) {
    firebaseFunctions
        .doSignOut()
        .then(function () {
        res.send("signout");
    })
        .catch(function (error) {
        res.send(error);
    });
});
router.get("/getTheCurrentUser", function (req, res) {
    res.send(firebaseFunctions.getTheCurrentUser());
});
exports.default = router;
