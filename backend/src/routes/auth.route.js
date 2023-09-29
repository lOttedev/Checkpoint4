const express = require("express");

const CheckUserDoesntExist = require("../middleware/checkUserDoesntExist");
const CheckUserExists = require("../middleware/checkUserExist");
const checkUser = require("../Validator/userValidator");
const { signIn, signUp, logOut } = require("../controllers/authController");
const hashPassword = require("../middleware/hashPassword");
const checkLogin = require("../Validator/loginValidatator");

const router = express.Router();

router.post("/sign-in", checkLogin, CheckUserExists, signIn);
router.post("/sign-up", checkUser, CheckUserDoesntExist, hashPassword, signUp);
router.get("/logout", logOut);

module.exports = router;
