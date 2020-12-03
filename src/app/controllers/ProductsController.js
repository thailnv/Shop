const Product = require('../models/Product');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
class ProductsController{
    
    // [GET] /products
    index(req , res, next){
        Product.find({}).then(products=>{
            products = Convert.cvDataToObjects(products);
            res.render('products', {products});
        }).catch(next);
    }
    
    //[GET] /products/...
    chair(req, res, next){
        var Title = 'Chair & Sofa';
        Supplier.find({}).then(suppliers=>{
            suppliers = Convert.cvDataToObjects(suppliers);
            Product.find({type:1})
            .then(products => {
                products = Convert.cvDataToObjects(products);
                var Banner = products[products.length - 1].image;
                res.render('category', { Banner, Title, suppliers, products});
            })
            .catch(next);
        }).catch(next);
    }
    table(req, res, next){
        var Title = 'Table';
        Supplier.find({}).then(suppliers=>{
            suppliers = Convert.cvDataToObjects(suppliers);
            Product.find({type:2})
            .then(products => {
                products = Convert.cvDataToObjects(products);
                var Banner = products[products.length - 1].image;
                res.render('category', { Banner, Title, suppliers, products});
            })
            .catch(next);
        }).catch(next);
    }
    decor(req, res, next){
        var Title = 'Decoration';
        Supplier.find({}).then(suppliers=>{
            suppliers = Convert.cvDataToObjects(suppliers);
            Product.find({type:3})
            .then(products => {
                products = Convert.cvDataToObjects(products);
                var Banner = products[products.length - 1].image;
                res.render('category', { Banner, Title, suppliers, products});
            })
            .catch(next);
        }).catch(next);
    }
    bed(req, res, next){
        var Title = 'Bed';
        Supplier.find({}).then(suppliers=>{
            suppliers = Convert.cvDataToObjects(suppliers);
            Product.find({type:4})
            .then(products => {
                products = Convert.cvDataToObjects(products);
                var Banner = products[products.length - 1].image;
                res.render('category', { Banner, Title, suppliers, products});
            })
            .catch(next);
        }).catch(next);
    }
}

module.exports = new ProductsController;