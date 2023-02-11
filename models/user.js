const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    password:{
        type : String,
        require : true
    }
},{ timestamps : true });                               // Adds two fields in each Documents 'createdAt' and 'updatedAt'

const user = new mongoose.model('User', userSchema);

module.exports = user;