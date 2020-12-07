const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Supplier = new Schema({
    name: { type: String },
    image: { type: String },
    address: { type: String },
    phonenumber: { type: String }
});

module.exports = mongoose.model('Supplier', Supplier);