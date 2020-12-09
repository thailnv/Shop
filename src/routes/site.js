const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/admin', siteController.admin);

router.post('/api/newproduct', siteController.createProduct);

router.post('/api/register', siteController.createCustomer);

router.post('/api/login', siteController.login);

router.get('/',siteController.index);

module.exports = router;