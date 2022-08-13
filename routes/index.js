const express = require('express');
const router = express.Router();
const controllers = require('../controllers')

//middleware
//const middleware = require('')

//loading the module into the folder.
const auth_routes = require('./auth_routes');

router.use(auth_routes);

module.exports = router;