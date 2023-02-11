const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    function(email, password, done) {
        // find the user and estaablish the identity
        User.findOne({email : email}, function(error, user) {
            if(error){
                console.log('Error finding the user');
                return done(error);
            }
            else if(!user || user.password != password){
                console.log('Invalid username password');
                return done(null, false);
            }else{
                console.log('User authenticated');
                return done(null, user);
            }
        })
    }
));
// serialize the user to decided which keys to put in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// de-serialize the user from the keys present in cookie.
passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, user) {
        if(error){
            console.log('Error in finding User');
            return done(error);
        }else{
            console.log('User is found');
            return done(null, user);
        }
    })
});
module.exports = passport;