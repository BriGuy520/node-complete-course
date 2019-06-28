const express = require('express');

const app = express();

// app.use((req, res, next) => {
//   console.log('hello from the first middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('hello from the second middleware');
// });

app.use('/users', (req, res) => {
  res.send('<html>Hello from the /users route</html>');
});


app.use('/', (req, res) => {
  res.send('<html>Hello from the / route</html>');
});


app.listen(3001);