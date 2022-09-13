const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {authorize} = require('../middlewares/authorization')

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
    allProducts,
    dataSub,
    validateCableSub,
    cableSub,
    airtimeSub,
    validatePhcnSub,
    phcnSub,
    createTransactionPinBill,
    encryptTransactionPinBill,
    
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

// PRODUCTS
router.get("/allProducts", allProducts);

// DATA SUB
router.post("/dataSub",[ authorize ], dataSub);

// CABLE
router.post("/validateCableSub",[ authorize ], validateCableSub);
router.post("/cableSub",[ authorize ], cableSub);

// PHCN
router.post("/validatePhcnSub",[ authorize ], validatePhcnSub);
router.post("/phcnSub",[ authorize ], phcnSub);

// AIRTIME
router.post("/airtimeSub",[ authorize ], airtimeSub);

// BILL TRANSACTION PIN
router.post("/createTransactionPinBill", [ authorize ], createTransactionPinBill);

// ENCRYPT BILL TRANSACTION PIN
router.post("/encryptTransactionPinBill",[ authorize ], encryptTransactionPinBill);

module.exports = router