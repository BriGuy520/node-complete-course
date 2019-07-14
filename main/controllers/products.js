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

exports.shopHome = (req, res, next) => {
  res.render("shop/index", {
    docTitle: "Home",
    path: "/"
  });
}

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
      path: "/products", 
      hasProducts: products.length > 0, 
      activeShop: true
    });
  });
};

exports.showCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "Cart",
    path: "/cart"
  })
}