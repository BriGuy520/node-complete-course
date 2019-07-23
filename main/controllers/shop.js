const Products = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Products.findAll()
  .then(products => {
    res.render('shop/product-list', { 
      prods: products, 
      docTitle: 'All Products', 
      path: "/products"
    });
  }).catch(err => console.log(err));

  
 }

 exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Products.findAll({ where: {id: prodId}})
  // .then(products => {
  //   res.render('shop/product-detail', {
  //     product: products[0],
  //     docTitle: product[0].title,
  //     path: '/products/' + product.id
  //   });
  // })
  // .catch(err => console.log(err));
  Products.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        docTitle: product.title,
        path: '/products/' + product.id
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.shopHome = (req, res, next) => {
  Products.findAll()
  .then(products => {
    res.render('shop/index', { 
      prods: products, 
      docTitle: 'Shop', 
      path: "/"
    });
  }).catch(err => console.log(err));
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