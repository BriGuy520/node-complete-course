const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageURL){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }

  save(){
    const db = getDb();
    return db.collection('product')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product;

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('products', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   }, 
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageURL: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// module.exports = Product;


// // const fs = require('fs');
// // const path = require('path');
// const db = require('../util/database');

// const Cart = require('./cart');

// // const paths = path.join(
// //   path.dirname(process.mainModule.filename), 
// //   'data', 
// //   'products.json'
// // );

// // const getProductsFromFile = (cb) => {

// //   fs.readFile(paths, (err, fileContent) => {
// //     if(err){
// //      return cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // }

// module.exports = class Product {
//   constructor(id, title, imageURL, price, description){
//     this.id = id;
//     this.title = title;
//     this.imageURL = imageURL;
//     this.price = price;
//     this.description = description;
//   }

//   save(){
//     // getProductsFromFile(products => {
//     //   if(this.id){
//     //     const existingProductIdx = products.findIndex(prod => prod.id === this.id);
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIdx] = this;
//     //     fs.writeFile(paths, JSON.stringify(updatedProducts), (err) => {
//     //       console.log(err);
//     //     });
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(paths, JSON.stringify(products), (err) => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });

//     // fs.readFile(paths, (err, fileContent) => {
//     //   console.log(err);
//     // });

//     return db.execute('INSERT INTO products (title, price, imageURL, description) VALUES (?, ?, ?, ?)', 
//     [this.title, this.price, this.imageURL, this.description]);
//   }

//   // static makes sure that the fetchAll method is called on 
//   // the class itself.
//   static fetchAll(){
//     // getProductsFromFile(cb);
//     return db.execute('SELECT * FROM products');

//   }

//   static findById(id){
//     // getProductsFromFile(products => {
//     //   const product = products.find(prod => prod.id === id);

//     //   cb(product);
//     // });

//     return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
//   }

//   static removeProduct(id){
//     // getProductsFromFile(products => {
//     //   const product = products.find(prod => prod.id === id);
//     //   console.log(product);
//     //   const updatedProduct = products.filter(prod => prod.id !== id);
      
//     //   fs.writeFile(paths, JSON.stringify(updatedProduct), err => {
//     //     if(!err){
//     //       Cart.deleteProduct(id, product.price);
//     //     } else {
//     //       console.log(err);
    //     }
    //   });
    // });   
//   }
// }