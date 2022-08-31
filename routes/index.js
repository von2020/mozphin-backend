const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

//middleware
//const middleware = require('')

//loading the module into the folder.
const auth_routes = require('./auth');

const bills_routes = require('./bills');

router.use(auth_routes);
// router.use('/bills', bills_routes);

module.exports = router;