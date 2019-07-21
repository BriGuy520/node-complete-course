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
      path: "/"
    });
  });
}

exports.showCart = (req, res, next) => {
  Cart.getCart(cart => {
    Products.fetchAll(products => {
      const cartProducts = [];
      for(let product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: cartProducts
      });
    }) 
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Products.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
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