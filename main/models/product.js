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
  constructor(title){
    this.title = title;
  }

  save(){
   
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(paths, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });

    fs.readFile(paths, (err, fileContent) => {
      
    });
  }

  // static makes sure that the fetchAll method is called on 
  // the class itself.
  static fetchAll(cb){
    getProductsFromFile(cb);
  }

}