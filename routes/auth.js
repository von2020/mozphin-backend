const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



const { auth_controllers} = require('../controllers/index');

// define all controllers
const {
    addUser,
    allUsers,
    singleUsers,
    updateUser,
    login,
    forgetPassword
}= auth_controllers;



// REGISTER
router.post("/createUser", addUser);
router.get("/allUsers", allUsers);
router.get("/singleUser/:id", singleUsers);
router.put("/updateUser/:id", updateUser);


// LOGIN
router.post("/login", login);

router.post("/forgetPassword", forgetPassword);


module.exports = router