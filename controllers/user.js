const db = require('../config/mongoose');
const userCollection = require('../models/user');

module.exports.signIn = function (request, response) {
    return response.render('user_sign_in', {title : 'Sign In'});
}
module.exports.signUp = function(request, response) {
    return response.render('user_sign_up', {title : 'Sign Up'});
}
module.exports.signOut = function(request, response) {
   //TO DO 
}
module.exports.add = function(request, response) {
    if(request.body.password != request.body.confirm_password) return response.redirect('back');
    userCollection.create({
        name : request.body.name,
        email : request.body.email,
        password : request.body.password
    }, function(error) {
        if(error){
            console.error('Error in Adding new User');
            return response.redirect('back');
        } else {
            console.log('New User Added In Database');
            return response.render('user_sign_in', {title : 'Sign In'});
        }
    });
}
module.exports.autheticate = function(request, response) {
   return response.redirect('/user/profile');
}
module.exports.profile = function(request, response) {
    return response.render('user_profile');
}