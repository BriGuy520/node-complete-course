const http = require('http');

const routes = require('./routes');

const server = http.createServer(routes);

const PORT = 3000;

server.listen(PORT);