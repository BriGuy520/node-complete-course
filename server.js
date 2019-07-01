const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use( '/add-product',(req, res, next) => {
  
  res.send('<html><form action="/product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form></html>');
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
})

app.use( '/',(req, res, next) => {
  res.send('<html>Hello from express</html>');
});

app.listen(3000);