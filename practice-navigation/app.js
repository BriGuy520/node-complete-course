const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routesAll = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routesAll);

app.listen(3002);