const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    name: { type: String },
    personalID: {type: String, default: ''},
    phonenumber: { type: String },
    role : {type: Number, required: true},
    username: {type: String, unique: true},
    password: {type: String},
},{
    versionKey : false,
});

module.exports = mongoose.model('Employee', Employee);