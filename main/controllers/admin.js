const Products = require('../models/product');
const Users = require('../models/user');

exports.getAddProduct = (req, res, next) => {  
  res.render('admin/edit-product', {
    docTitle: 'Add Product', 
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Products({ title: title, price: price, description: description, imageURL: imageURL });
  product.save()
    .then(result => {
      res.redirect('/admin/products');
      console.log("created Product!");
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

exports.getEditProduct = (req, res, next) => { 
  const editMode = req.query.edit; 

  if(!editMode){
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Products.findById(prodId)
  // req.user.getProducts({ where: {id: prodId} })
  // Products.findByPk(prodId)
  .then(product => {
    if(!product){
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      docTitle: 'Add Product', 
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }).catch(err => console.log(err));
};

exports.postEditProducts = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageURL = req.body.imageURL;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Products(prodId, updatedTitle, updatedImageURL, updatedPrice, updatedDesc);

  // const product = new Products(updatedTitle, updatedPrice, updatedDesc, updatedImageURL, prodId);
Products.findById(prodId).then(product => {
  product.title = updatedTitle;
  product.price = updatedPrice;
  product.description = updatedDesc;
  product.imageURL = updatedImageURL;
  return product.save();
})

  // Products.findByPk(prodId)
  .then(result => {
    console.log("PRODUCT UPDATED");
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));  
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Products.removeProduct(prodId);
  // Products.findByPk(prodId)
  // Products.deleteProduct(prodId)
  Products.findByIdAndRemove(prodId)
  .then(result => {
    console.log("Product destroyed");
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  
}

exports.getAllProducts = (req, res, next) => {

  Products.find()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Admin Products',
      path: "/admin/products"
    });
  })


  // Products.fetchAll()
  //  .then(products => {
  //   res.render('admin/products', { 
  //     prods: products, 
  //     docTitle: 'All Admin Products', 
  //     path: "/admin/products"
  //   });
  // })
  // .catch(err => console.log(err));
  
  // req.user.getProducts()
  // // Products.findAll()
  // .then(products => {
  //   res.render('admin/products', { 
  //     prods: products, 
  //     docTitle: 'All Admin Products', 
  //     path: "/admin/products"
  //   });
  // })
  // .catch(err => console.log(err));
 
  // Products.fetchAll(products => {
  //   res.render('admin/products', { 
  //     prods: products, 
  //     docTitle: 'All Admin Products', 
  //     path: "/admin/products"
  //   });
  // });

  exports.getAddUser = (req, res, next) => {
    res.render('admin/add-user', {
      docTitle: 'Add User', 
      path: '/admin/add-user'
    });
  }

  exports.addUser = (req, res, next) => {
    const { username, email } = req.body;

    const user = new Users(username, email);

    user.save()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }
}