const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passport = require('../config/passport_local_strategy');
//const passport = require('passport-local');

router.get('/sign-in', passport.redirectProfile, userController.signIn);
router.get('/sign-up', passport.redirectProfile ,userController.signUp);
router.get('/sign-out', userController.destroySession);
router.get('/profile', passport.checkAuthentication,userController.profile);
router.post('/add', userController.add);
router.post('/authenticate', passport.authenticate('local', { failureRedirect: '/user/sign-in' }), userController.createSession); // using passport middleware to authenticate

module.exports = router;