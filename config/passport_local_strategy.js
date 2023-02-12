const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email', // needs to match with field having property unique in UserSchema.
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
    console.log('serialize');
    done(null, user.id);
});
// de-serialize the user from the keys present in cookie.
passport.deserializeUser(function(id, done) {
    console.log('de-serialize')
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

passport.checkAuthentication = function (request, response, next) { // check whether the user is authenticated.
    console.log('checkAuthentication() called');
     // passport sets the isAuthenticated property in request.
    if(request.isAuthenticated()) return next();                    // if user is signed in than pass the request to the next function(controller action).
    return response.redirect('/user/sign-in');                      // user is not signed-in or authenticated.
}

passport.setAuthenticatedUser = function(request, response, next) {
    // request.user contains the current signed user form the session cookie and we are sending the user data to response.locals for the views
    if(request.isAuthenticated()) response.locals.user = request.user;
    return next();
}

passport.redirectProfile = function(request, response, next) {
    if (request.isAuthenticated()) return response.redirect('/user/profile');
    return next();
}

module.exports = passport;