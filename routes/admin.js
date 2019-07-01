const express = require('express');

const router = express.Router();

router.get( '/add-product',(req, res, next) => {  
  res.send('<html><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form></html>');
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;