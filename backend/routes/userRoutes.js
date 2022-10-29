const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post('/login',userController.userLogin); // it will call a function that will make user login

router.post("/signup",userController.userSignup); // it will call a function that will make user signup

module.exports = router;


