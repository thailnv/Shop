const mongoose = require('mongoose');
const Convert = require('../../util/mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    name: {type: String},
    image: {type: String},
    number: {type: Number},
    price: {type: Number},
    type: {type: Number},
    discount: {type: Number},
});

module.exports = mongoose.model('Product', Product);
