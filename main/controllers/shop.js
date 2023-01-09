const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
  Products.fetchAll()
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
  Products.fetchAll()
  .then(products => {
    res.render('shop/index', { 
      prods: products, 
      docTitle: 'Shop', 
      path: "/"
    });
  }).catch(err => console.log(err));
}

exports.showCart = (req, res, next) => {
  console.log(req.user.cart);
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
       res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products: products
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));


  // Cart.getCart(cart => {
  //   Products.fetchAll(products => {
  //     const cartProducts = [];
  //     for(let product of products){
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if(cartProductData){
  //         cartProducts.push({productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       docTitle: "Cart",
  //       path: "/cart",
  //       products: cartProducts
  //     });
  //   }) 
  // });
}

exports.postCart = (req, res, next) => {

  const prodId = req.body.productId;

  Products.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err))

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

req.user.getCart()
.then(cart => {
  return cart.getProducts({ where: { id: prodId }});
})
.then(products => {
  const product = products[0];
  return product.cartItem.destroy();
})
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
  req.user.getCart()
  .then(cart => {
    return cart.getProducts();
  })
  .then(products => {
    return req.user.createOrder()
      .then(order => {
        return order.addProducts(products.map(product => {
          product.orderItem = { quantity: product.cartItem.quantity }; 
          return product;
        }));
      })
      .catch(err => console.log(err));
  })
  .then(result => {
    fetchedCart.setProducts(null);
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err));
}

exports.showOrders = (req, res, next) => {

  req.user.getOrders({ include: ['products']})
    .then(orders => {
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