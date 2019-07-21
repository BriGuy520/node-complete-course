const fs = require('fs');
const path = require('path');

const paths = path.join(
  path.dirname(process.mainModule.filename), 
  'data', 
  'products.json'
);

const getProductsFromFile = (cb) => {

  fs.readFile(paths, (err, fileContent) => {
    if(err){
     return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageURL, price, description){
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  save(){
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIdx = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIdx] = this;
        fs.writeFile(paths, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(paths, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });

    fs.readFile(paths, (err, fileContent) => {
      
    });
  }

  // static makes sure that the fetchAll method is called on 
  // the class itself.
  static fetchAll(cb){
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);

      cb(product);
    });
  }

  static removeProduct(id){
    getProductsFromFile(products => {
      const productIdx = products.findIndex(prod => prod.id === id);
      console.log(productIdx);
      console.log(products.splice(productIdx, 1));
    });
  }

}