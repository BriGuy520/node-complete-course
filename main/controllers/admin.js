const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {  
  res.render('admin/edit-product', {
    docTitle: 'Add Product', 
    path: '/admin/add-product'
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;

  const product = new Products(title, imageURL, price, description);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => { 
  const editMode = req.query.edit; 

  if(!editMode){
    return res.redirect('/');
  }

  res.render('admin/edit-product', {
    docTitle: 'Add Product', 
    path: '/admin/edit-product',
    editing: editMode
  });
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