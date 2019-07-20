const Products = require('../models/product');

exports.getAddProduct = (req, res, next) => {  
  res.render('admin/edit-product', {
    docTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;

  const product = new Products(null, title, imageURL, price, description);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => { 
  const editMode = req.query.edit; 

  if(!editMode){
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Products.findById(prodId, product => {

    if(!product){
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      docTitle: 'Add Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageURL = req.body.imageURL;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedProduct = new Products(prodId, updatedTitle, updatedImageURL, updatedPrice, updatedDesc);
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getAllProducts = (req, res, next) => {
  Products.fetchAll(products => {
    res.render('admin/products', { 
      prods: products, 
      docTitle: 'All Admin Products', 
      path: "/admin/products"
    });
  });
}