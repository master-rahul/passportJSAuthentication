const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passportJSAuthentication');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting to Db :'));
db.once('open', function() {console.log('Successfully connected to Database')});
module.exports = db;