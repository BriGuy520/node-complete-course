const express = require('express');
const path = require('path');

const shopController = require("../controllers/shop");

const router = express.Router();

router.get( '/products',  shopController.getProducts);

router.get('/cart', shopController.showCart);

router.get('/checkout');

router.get('/', shopController.shopHome);

module.exports = router;