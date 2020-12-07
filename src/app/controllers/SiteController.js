const Product = require('../models/Product');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
class SiteController {

    index(req, res, next) {
        res.render('home');
    }
    admin(req, res, next) {
        var productsAPI;
        var nItem = 0;
        Supplier.find({}).then(suppliers => {
            suppliers = Convert.cvDataToObjects(suppliers);
            Product.find({})//find field 'name' of all document with type = 1
                .then(products => {
                    products = Convert.cvDataToObjects(products);
                    nItem = products.length;
                    res.render('admin', { suppliers, products, nItem });
                })
                .catch(next);
        }).catch(next);
    }
    createProduct(req, res, next) {
        let product = {
            name: req.body.name,
            image: '/img/' + req.body.image,
            price: parseInt(req.body.price),
            type: parseInt(req.body.type),
            discount: 0,
            number: parseInt(req.body.number),
        };
        console.log(product);
        let pro = new Product(product);
        pro.save();
        res.json({
            status : "success"
        })
    }
}
module.exports = new SiteController;