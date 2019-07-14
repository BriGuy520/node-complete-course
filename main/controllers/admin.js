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
  const { title, imageURL, price, description } = req.body;

  const product = new Products(title, imageURL, price, description);
  product.save();
  res.redirect('/');
};

exports.getAllProducts = (req, res, next) => {
  Products.fetchAll(products => {
    res.render('admin/products', { 
      prods: products, 
      docTitle: 'All Admin Products', 
      path: "/admin/products"
    });
  });
}