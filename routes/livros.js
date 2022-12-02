const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const LivrosController = require('../controllers/livros-controller');

router.get('/', LivrosController.getLivros); 
router.get('/lastLivros', LivrosController.getLivrosByLast); 
router.get('/:id_livro', LivrosController.getLivroById); 
router.get('/livrosAutor/:id_autor', LivrosController.getLivroByAutor);
router.get('/categoria/:nm_categoria', LivrosController.getLivroByCategoria); 
router.get('/busca/:busca', LivrosController.getLivroByBusca);
router.post('/file', LivrosController.upload.single('file'), LivrosController.postArquivo)
router.post('/', LivrosController.postLivro, login); 
router.patch('/:cd_livro',login, LivrosController.patchLivro);
router.delete('/:id_livro',login, LivrosController.deleteLivro);

module.exports = router; // exportando modulo router



