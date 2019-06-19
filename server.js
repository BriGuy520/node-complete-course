const http = require('http');

const routes = require('./routes');

console.log(routes.someText);

const server = http.createServer(routes.handler);

const PORT = 3000;

server.listen(PORT);