class ProductsController{
    
    // [GET] /products
    index(req , res){
        res.render('products');
    }
    
    //[GET] /products/...
    chair(req, res){
        res.render('chair');
    }
}

module.exports = new ProductsController;