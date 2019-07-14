const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
  Products.fetchAll(products => {
     res.render('shop/product-list', { 
       prods: products, 
       docTitle: 'All Products', 
       path: "/products"
     });
   });
 };

exports.shopHome = (req, res, next) => {
  Products.fetchAll(products => {
    res.render('shop/index', { 
      prods: products, 
      docTitle: 'All Products', 
      path: "/products"
    });
  });
}

exports.showCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "Cart",
    path: "/cart"
  });
}

exports.showOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Orders",
    path: "/orders"
  });
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: 'Checkout',
    path: '/checkout'
  })
}