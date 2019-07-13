const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {  
  res.render('add-product', {
    docTitle: 'Add Product', 
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true, 
    activeAddProduct: true 
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Products(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
 Products.fetchAll(products => {
    res.render('shop', { 
      prods: products, 
      docTitle: 'Shop', 
      path: "/", 
      hasProducts: products.length > 0, 
      activeShop: true
    });
  });
 
};