const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

const routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000);