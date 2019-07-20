const Products = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Products.fetchAll(products => {
     res.render('shop/product-list', { 
       prods: products, 
       docTitle: 'All Products', 
       path: "/products"
     });
   });
 }

 exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      docTitle: product.title,
      path: '/products/' + product.id
    });
  });
}

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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Products.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
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