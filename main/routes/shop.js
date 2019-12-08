const express = require('express');
const path = require('path');

const shopController = require("../controllers/shop");

const router = express.Router();

router.get( '/products',  shopController.getProducts);

router.get( '/products/:productId',  shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.deleteProduct);

// // router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.showOrders);

router.post('/create-order', shopController.postOrder);

router.get('/', shopController.shopHome);

module.exports = router;