const http = require('http'); // importando o http
const app = require('./app'); // importando o app
const port = process.env.PORT || 3000; //porta da variavel ou 3000 padrao
const server = http.createServer(app); // criar server
server.listen(port);
