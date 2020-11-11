const Product = require('../models/Product');

class SiteController{
    
    index(req , res){
        //res.render('home');
        Product.find({}, function(err , Product){
            if(!err){
                res.json(Product);
                console.log('get data');
            }
            else
                res.status(400).json({error: 'ERROR!'});
        })
    }
}
module.exports = new SiteController;