const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
  // Products.fetchAll()
  // .then(products => {
  //   res.render('shop/product-list', { 
  //     prods: products, 
  //     docTitle: 'All Products', 
  //     path: "/products"
  //   });
  // }).catch(err => console.log(err));  

  Products.find()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'All Products',
      path: '/products'
    })
  })
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
  // Products.findByPk(prodId)
    Products.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        docTitle: product.title,
        path: '/products' + product._id
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.shopHome = (req, res, next) => {
  // Products.fetchAll()
  // .then(products => {
  //   res.render('shop/index', { 
  //     prods: products, 
  //     docTitle: 'Shop', 
  //     path: "/"
  //   });
  // }).catch(err => console.log(err));

  Products.find()
  .then(products => {
    res.render('shop/index', { 
      prods: products, 
      docTitle: 'Shop', 
      path: "/"
    });
  }).catch(err => console.log(err));
}

// exports.showCart = (req, res, next) => {
//   req.user.getCart()
//   .then(cart => {
//     return cart.getProduct()
//     .then(products => {
//        res.render("shop/cart", {
//         docTitle: "Cart",
//         path: "/cart",
//         products: products
//       });
//     })
//     .catch(err => console.log(err));
//   })
//   .catch(err => console.log(err));
// }

exports.getCart = (req, res, next) => {

  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: products
      });
    })
    .catch(err => console.log(err));
}


exports.postCart = (req, res, next) => {

  const prodId = req.body.productId;

  Products.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })

  // let fetchedCart;
  // let newQuantity = 1;

  // req.user.getCart()
  // .then(cart => {

  //   fetchedCart = cart;

  //   return cart.getProducts({ where: { id: prodId } });
  // })
  // .then(products => {

  //   let product;

  //   if(products.length > 0){
  //     product = products[0];
  //   }

  //   if(product){
  //     //
  //     let oldQuantity = product.cartItem.quantity;
  //     newQuantity = oldQuantity + 1;
  //     return product;
  //   }
  //     return Products.findByPk(prodId)
  // })
  // .then(product => {
  //   return fetchedCart.addProduct(product, {
  //     through: { quantity: newQuantity }
  //   });
  // })
  // .then(cart => {
  //   res.redirect('/cart');
  // })
  // .catch(err => console.log(err));

  // Products.findById(prodId, product => {
  //   Cart.addProduct(prodId, product.price);
  // });

}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

// req.user.deleteCartItem(prodId)
req.user.removeFromCart(prodId)
.then(result => {
  res.redirect('/cart');
})
.catch(err => console.log(err));

  // Products.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // }); 
}

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err));
}

exports.showOrders = (req, res, next) => {

  req.user
  .populate('order.items.productId')
  .execPopulate()
    .then(user => {
      const orders = user.order.items;
      console.log(orders);
      res.render("shop/orders", {
        docTitle: "Orders",
        path: "/orders",
        orders: orders
      });
    })
    .catch(err => console.log(err));
}

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     docTitle: 'Checkout',
//     path: '/checkout'
//   })
// }