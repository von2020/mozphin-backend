const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


const { bill_controllers} = require('../controllers/index');

const { auth_controllers} = require('../controllers/index');

// define all controllers
const {
    addUser,
    allUsers,
    singleUsers,
    updateUser,
    login,
    forgetPassword,
    resetPassword,
    updatePassword,
    createTransactionPin,
    validateTransactionPin
}= auth_controllers;

const {
    allServices,
    dataSub,
    cableSub,
    airtimeSub,
    phcnSub,
    
}= bill_controllers;



// REGISTER
router.post("/createUser", addUser);
router.get("/allUsers", allUsers);
router.get("/singleUser/:id", singleUsers);
router.put("/updateUser/:id", updateUser);


// LOGIN
router.post("/login", login);

// MANAGE PASSWORD
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword);
router.post("/updatePassword", updatePassword);

// TRANSACTION PIN
router.post("/createTransactionPin", createTransactionPin);
router.post("/validateTransactionPin", validateTransactionPin);


// SERVICES
router.get("/allServices", allServices);

// DATA SUB
router.post("/dataSub", dataSub);

// CABLE
router.post("/cableSub", cableSub);

// PHCN
router.post("/phcnSub", phcnSub);

// AIRTIME
router.post("/airtimeSub", airtimeSub);
module.exports = router