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
  const product = new Products(title, price, description, imageURL);
  product.save()
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    })
  // req.user.createProduct({
  //   title: title,
  //   imageURL: imageURL,
  //   price: price,
  //   description: description
  // })
  // .then(result => {
  //   // console.log(result);
  //   res.redirect('/admin/products');
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // const product = new Products(null, title, imageURL, price, description);
  // product.save()
  //   .then(() => {
  //     res.redirect('/');
  //   })
  //   .catch((err) =>{
  //     console.log(err);
  //   });  
};

// exports.getEditProduct = (req, res, next) => { 
//   const editMode = req.query.edit; 

//   if(!editMode){
//     return res.redirect('/');
//   }

//   const prodId = req.params.productId;

//   req.user.getProducts({ where: {id: prodId} })
//   // Products.findByPk(prodId)
//   .then(products => {
//     const product = products[0];
//     if(!product){
//       return res.redirect('/');
//     }

//     res.render('admin/edit-product', {
//       docTitle: 'Add Product', 
//       path: '/admin/edit-product',
//       editing: editMode,
//       product: product
//     });
//   }).catch(err => console.log(err));
// };

// exports.postEditProducts = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageURL = req.body.imageURL;
//   const updatedPrice = req.body.price;
//   const updatedDesc = req.body.description;
//   // const updatedProduct = new Products(prodId, updatedTitle, updatedImageURL, updatedPrice, updatedDesc);
  
//   Products.findByPk(prodId)
//   .then(product => {
//     product.title = updatedTitle;
//     product.price = updatedPrice;
//     product.description = updatedDesc;
//     product.imageURL = updatedImageURL;
//     return product.save();
//   })
//   .then(result => {
//     console.log("PRODUCT UPDATED");
//     res.redirect('/admin/products');
//   })
//   .catch(err => console.log(err));
  
// }

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;

//   // Products.removeProduct(prodId);
//   Products.findByPk(prodId)
//   .then(product => {
//     return product.destroy();
//   })
//   .then(result => {
//     console.log("Product destroyed");
//     res.redirect('/admin/products');
//   })
//   .catch(err => console.log(err));
  
// }

// exports.getAllProducts = (req, res, next) => {
//   req.user.getProducts()
//   // Products.findAll()
//   .then(products => {
//     res.render('admin/products', { 
//       prods: products, 
//       docTitle: 'All Admin Products', 
//       path: "/admin/products"
//     });
//   })
//   .catch(err => console.log(err));
 
//   // Products.fetchAll(products => {
//   //   res.render('admin/products', { 
//   //     prods: products, 
//   //     docTitle: 'All Admin Products', 
//   //     path: "/admin/products"
//   //   });
//   // });
// }