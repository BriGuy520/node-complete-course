const express = require('express');
const path = require('path');

const productsController = require("../controllers/products");

const router = express.Router();

router.get( '/products',  productsController.getProducts);

router.get('/cart', productsController.showCart);

router.get('/', productsController.shopHome);

module.exports = router;