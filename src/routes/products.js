const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.use('/chair', productsController.chair);

router.use('/', productsController.index);

module.exports = router;