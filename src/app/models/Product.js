const mongoose = require('mongoose');
const Convert = require('../../util/mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    number: {type: Number, default: 1},
    price: {type: Number, required: true},
    type: {type: Number},
    discount: {type: Number, default: 0},
    supplier: {type: Number, required: true},
    status: {type: Number, default: 1},
    orderTime: {type: Number, default: 0}
},{
    versionKey : false,
    timestamps : true,
});

module.exports = mongoose.model('Product', Product);
