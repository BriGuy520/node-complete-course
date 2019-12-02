const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save(){
    const db = getDb();
   
   return db.collection('user').insertOne(this);
  }

  addToCart(product){
    const cartProductIdx = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIdx >= 0){
      newQuantity = this.cart.items[cartProductIdx].quantity + 1;
      updateCartItems [cartProductIdx].quantity = newQuantity;
    } else {
      updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity });
    }
    const updatedCart = {
     items: updatedCartItems
    }
    const db = getDb();

    return db.collection('user').updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: updatedCart }});
  }

  getCart(){
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });
    
    return db
    .collection('product')
    .find({_id: { $in: productIds}})
    .toArray()
    .then(products => {
      return products.map(p => {
        return {
          ...p, quantity: this.cart.items.find(i => {
            return i.productId.toString() === p._id.toString();
          }).quantity
        };
      });
    });
  }

  static findById(id){
    const db = getDb();
    return db.collection('user').find({ _id: new ObjectId(id) })
      .next()
      .then(user => {
        return user;
      })
      .catch(err => console.log(err))
  } 
}


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }, 
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = User;