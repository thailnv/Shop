const Product = require('../models/Product');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
class SiteController {

    index(req, res, next) {
        res.render('home');
    }
    admin(req, res , next){
        //use callback
        // Product.find({}, function(err , Product){
        //     if(!err){
        //         res.json(Product);
        //         console.log('get data');
        //     }
        //     else
        //         res.status(400).json({error: 'ERROR!'});
        // })
        //use promise
        var productsAPI;
        var nItem = 0;
        Supplier.find({}).then(suppliers=>{
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
}
module.exports = new SiteController;