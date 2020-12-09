const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
class SiteController {

    index(req, res, next) {
        let lstBestSeller, lstNewArrivals;
        Product.find({}).sort({orderTime : 'desc'}).limit(10)
        .then(bestSellers=> {
            lstBestSeller = Convert.cvDataToObjects(bestSellers);
            Product.find({}).sort({createdAt : 'desc'}).limit(10)
            .then(newArrivals=>{
                lstNewArrivals = Convert.cvDataToObjects(newArrivals);
                res.render('home', {lstBestSeller,lstNewArrivals});
            })
        })
    }
    admin(req, res, next) {
        var productsAPI;
        var nItem = 0;
        Supplier.find({}).then(suppliers => {
            suppliers = Convert.cvDataToObjects(suppliers);
            Product.find({})//find field 'name' of all document with type = 1
                .then(products => {
                    products = Convert.cvDataToObjects(products);
                    //console.log(products);
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
            supplier: parseInt(req.body.supplier),
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
    createCustomer(req, res, next) {
        let customer = {
            name: req.body.name,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
            username: req.body.username,
            password: req.body.password,
        };
        console.log(customer);
        let cus = new Customer(customer);
        cus.save().then(()=>{
            res.json({
                status : "success",
                name: customer.name,
                address : customer.address,
                phone : customer.phonenumber,
                role : 0,
            })
        })
        .catch(()=>{
            res.json({
                status : "fail"
            })
        })

    }
    login(req, res, next){
        Customer.find({username : req.body.username, password : req.body.password})
        .then(users => {
            users = Convert.cvDataToObjects(users);
            console.log(users[0]);
            if(users.length > 0){
                res.json({
                    status : 'success',
                    name: users[0].name,
                    address : users[0].address,
                    phone : users[0].phonenumber,
                    role : 0,
                })
            }
        })
    }
}
module.exports = new SiteController;