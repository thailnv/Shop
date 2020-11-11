class ProductsController{
    
    // [GET] /products
    index(req , res){
        console.log('render index');
        res.render('home');
    }
    
    //[GET] /products/...
    chair(req, res){
        console.log('render chair');
        res.render('chair');
    }
}

module.exports = new ProductsController;