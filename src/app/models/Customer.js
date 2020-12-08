const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: { type: String },
    address: { type: String },
    phonenumber: { type: String },
    username: {type: String, unique: true},
    password: {type: String},
    idnumber: {type: String, default: ''}
},{
    versionKey : false,
});

module.exports = mongoose.model('Customer', Customer);