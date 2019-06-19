const http = require('http');
const routes = require('./practice-routes.js');

const server = http.createServer(routes);

const PORT = 3000;

console.log('hello from app.js');
server.listen(PORT);
