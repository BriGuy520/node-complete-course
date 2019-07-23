const express = require('express');
const bodyParser = require('body-parser');
// const handlebars = require('express-handlebars');
const path = require('path');

const app = express();

const errorController = require("./controllers/errors");

const sequelize = require('./util/database');

// app.engine('hbs', handlebars({
//   layoutsDir: 'views/layouts',
//   defaultLayout: 'main-layout',
//   extname: 'hbs'
// }));

app.set('view engine', 'ejs');
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.errors);

sequelize.sync()
  .then(result => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => console.log(err));

