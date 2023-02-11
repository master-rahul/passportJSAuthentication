const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');
const user = require('./user');

router.use('/user/', user);

router.get('/', indexController.home);


module.exports = router;