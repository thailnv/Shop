const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Convert = require('../../util/mongoose');
const Supplier = require('../models/Supplier');
const Employee = require('../models/Employee');
class SiteController {

    index(req, res, next) {
        let lstBestSeller, lstNewArrivals;
        Product.find({}).sort({ orderTime: 'desc' }).limit(10)
            .then(bestSellers => {
                lstBestSeller = Convert.cvDataToObjects(bestSellers);
                Product.find({}).sort({ createdAt: 'desc' }).limit(10)
                    .then(newArrivals => {
                        lstNewArrivals = Convert.cvDataToObjects(newArrivals);
                        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                        res.setHeader('Access-Control-Allow-Credentials', true);
                        res.render('home', { lstBestSeller, lstNewArrivals });
                    })
            })
    }
    admin(req, res, next) {
        console.log('admin');
        var productsAPI;
        // if (!req.session.role || req.session.role !== 2) {
        //     res.status(403).render('403');
        // } else 
        {
            console.log(req.session.role);
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
            status: "success"
        })
    }

    updateProduct(req, res, next){
        let product = {
            name: req.body.name,
            price: parseInt(req.body.price),
            type: parseInt(req.body.type),
            supplier: parseInt(req.body.supplier),
            discount: parseInt(req.body.discount),
            status : parseInt(req.body.status),
            number: parseInt(req.body.number),
        };
        console.log(product);
        Product.findOne({name : product.name}).then((doc)=>{
            doc.price = product.price;
            doc.save()
            .then(() => {
                res.json({
                    status: 'success'
                })
            })
            .catch(() => {
                res.json({
                    status: 'fail'
                })
            })
        })
    }

    createSupplier(req, res, next){
        let supplier = {
            name: req.body.name,
            image: '/img/' + req.body.image,
            address: req.body.address,
            phonenumber: req.body.phonenumber,
        };
        console.log(supplier);
        let sup = new Supplier(supplier);
        sup.save()
        .then(() => {
            res.json({
                status: "success"
            })
        })
        .catch(() => {
            res.json({
                status: "fail"
            })
        })
    }

    createStaff(req, res, next){
        let staff = {
            name : req.body.name,
            personalID : req.body.id,
            phonenumber : req.body.phonenumber,
            role : req.body.type,
            username : req.body.username,
            password : req.body.password,
        };
        console.log(staff);
        let stf = new Employee(staff);
        stf.save()
        .then(()=>{
            res.json({
                status : "success"
            })
        })
        .catch(()=>{
            res.json({
                status : 'fail'
            })
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
        cus.save().then(() => {
            req.session.role = 4;
            res.json({
                status: "success",
                name: customer.name,
                address: customer.address,
                phone: customer.phonenumber,
                role: 0,
            })
        })
            .catch(() => {
                res.json({
                    status: "fail"
                })
            })

    }

    login(req, res, next) {
        console.log('login');
        Customer.find({ username: req.body.username, password: req.body.password })
            .then(users => {
                users = Convert.cvDataToObjects(users);
                if (users.length > 0) {
                    console.log('customer');
                    console.log(users[0]);
                    req.session.role = 0;
                    res.json({
                        status: 'success',
                        name: users[0].name,
                        address: users[0].address,
                        phone: users[0].phonenumber,
                        role: 0,
                    })
                }
                else {
                    Employee.find({username: req.body.username, password: req.body.password})
                    .then(employees => {
                        employees = Convert.cvDataToObjects(employees);
                        if(employees.length > 0){
                            console.log('employee');
                            console.log(employees[0]);
                            req.session.role = employees[0].role;
                            res.json({
                                status: 'success',
                                name: employees[0].name,
                                address: employees[0].address,
                                phone: employees[0].phonenumber,
                                role: employees[0].role,
                            })
                        }
                        else{

                        }
                    })
                }
            })
    }

    logout(req, res, next){
        console.log('logout');
        req.session.destroy();
        res.json({
            status : 'success',
        })
    }

    denied(req, res, next) {
        res.status(403).render('403');
    }

    notfound(req, res, next) {
        console.log('not found');
        res.status(404).render('404');
    }
}
module.exports = new SiteController;