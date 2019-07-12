const express = require('express');

const router = express.Router();

const users = [];

router.get('/user', (req, res) => {
  res.render('form', {pageTitle: 'Template Practice', path: '/'})
});

router.post('/user', (req, res) => {
  users.push({ title: req.body.title });
  res.redirect('/');
});

router.get( '/',(req, res, next) => {
  res.render('users', { users: users, pageTitle: 'Users', path: "/", hasUsers: users.length > 0, activeShop: true});
});

module.exports = router;
exports.users = users;