const express = require('express');

const app = express();

app.use( '/add-product',(req, res, next) => {
  console.log('this is another middleware');
  res.send('<h1>Hello from express</h1>');
});

app.use( '/',(req, res, next) => {
  console.log('this is another middleware');
  res.send('<html>Hello from express</html>');
});

app.listen(3000);