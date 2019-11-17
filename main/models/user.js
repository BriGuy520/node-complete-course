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
    const cartProduct = this.cart.items.findIndex(cp => {
      return cp.productId === product._id;
    });
    let newQuantity = 1;

    if(cartProduct >= 0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    }
    const updatedCart = {items: [{productId: new ObjectId(product._id), quantity: newQuantity }] };

    const db = getDb();

    return db.collection('users').updateOne({ _id: new ObjectId(this._id)}, { $set: { cart: updatedCart }});
  }

  static findById(id){
    const db = getDb();
    return db.collection('user').find({ _id: new ObjectId(id) })
      .next()
      .then(user => {
        console.log(user);
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