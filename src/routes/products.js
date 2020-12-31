const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/chair', productsController.chair);

router.get('/table', productsController.table);

router.get('/decor', productsController.decor);

router.get('/bed', productsController.bed);

router.get('/', productsController.index);

router.get('/product/:name', productsController.search)

module.exports = router;