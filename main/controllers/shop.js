const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
  Products.fetchAll(products => {
     res.render('shop/product-list', { 
       prods: products, 
       docTitle: 'Shop', 
       path: "/products", 
       hasProducts: products.length > 0, 
       activeShop: true
     });
   });
 };

exports.shopHome = (req, res, next) => {
  res.render("shop/index", {
    docTitle: "Home",
    path: "/"
  });
}

exports.showCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "Cart",
    path: "/cart"
  });
}