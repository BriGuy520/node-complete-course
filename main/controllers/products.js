const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {  
  res.render('admin/add-product', {
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
    res.render('shop/product-list', { 
      prods: products, 
      docTitle: 'Shop', 
      path: "/", 
      hasProducts: products.length > 0, 
      activeShop: true
    });
  });
 
};