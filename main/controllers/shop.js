const Products = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Products.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', { 
        prods: rows, 
        docTitle: 'All Products', 
        path: "/products"
      });
    })
    .catch(err => {
      console.log(err);
    });
 }

 exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        docTitle: product.title,
        path: '/products/' + product.id
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.shopHome = (req, res, next) => {
  Products.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', { 
        prods: rows, 
        docTitle: 'Shop', 
        path: "/"
      });
    })
    .catch(err => {
      console.log(err);
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
  Products.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Products.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
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