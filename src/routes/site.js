const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/admin', siteController.admin);

router.post('/api/create/product', siteController.createProduct);

router.post('/api/create/supplier', siteController.createSupplier);

router.post('/api/create/staff', siteController.createStaff);

router.post('/api/update/product', siteController.updateProduct);

router.post('/api/update/supplier', siteController.updateProduct);

router.post('/api/register', siteController.createCustomer);

router.post('/api/login', siteController.login);

router.post('/api/logout', siteController.logout);

router.post('/api/order', siteController.order);

router.get('/',siteController.index);

router.get('*',siteController.notfound);

module.exports = router;