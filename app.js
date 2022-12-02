const express = require('express'); // importando express
const app = express(); // instancia do express
const cors = require('cors');
const rotaLivros = require('./routes/livros'); // importando livros
const rotaAutor = require('./routes/autor'); // importando autor
const rotaCategorias = require('./routes/categorias') // importando categorias



app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // aceitar formato json na entrada
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");  
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST. PATCH, DELETE, GET');
    }
    next();
});

app.use('/livros', rotaLivros); // chamando rota de livros
app.use('/autor', rotaAutor);
app.use('/categorias', rotaCategorias);
app.use('/uploads', express.static('uploads'));
// app.use(express.static(path.join(__dirname, './uploads')));

//req = requisicao, res = resposta, next = outro metodo

//quando não encontrar rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

module.exports = app; // exportando modulo app