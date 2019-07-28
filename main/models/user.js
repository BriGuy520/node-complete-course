const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email){
    this.name = name;
    this.email = email;
  }

  save(){
    const db = getDb();
   
   return db.collection('user').insertOne(this);
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