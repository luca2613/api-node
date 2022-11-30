const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
// const multer = require('multer');

const LivrosController = require('../controllers/livros-controller');

router.get('/', LivrosController.getLivros); 
router.get('/lastLivros', LivrosController.getLivrosByLast); 
router.get('/:id_livro', LivrosController.getLivroById); 
router.get('/livrosAutor/:id_autor', LivrosController.getLivroByAutor);
router.get('/categoria/:nm_categoria', LivrosController.getLivroByCategoria); 
router.get('/busca/:busca', LivrosController.getLivroByBusca);
router.post('/', login, LivrosController.postLivro); 
router.patch('/:id_livro',login, LivrosController.patchLivro);
router.delete('/:id_livro',login, LivrosController.deleteLivro);

module.exports = router; // exportando modulo router

// const storage = multer.diskStorage({
//     destination: function(req, file, callBack) {
//         callBack(null, './uploads')
//     },
//     filename:  function(req, file, callBack) {
//         callBack(null, new Date().toISOString() + file.originalname);
//     },
// })

// const upload = multer({storage: storage});



//post livros
// router.post('/',upload.single('imagem_livro'), (req, res, next) => {

//     mysql.getConnection((error, conn) => {
//         if(error) {return res.status(500).send({error: error})}
//         conn.query(
//             'INSERT INTO LIVRO (cd_categoria, cd_autor, nm_livro, ds_livro, dt_lancamento, cd_img_livro) VALUES (?,?,?,?,?,?)',
//             [
//                 req.body.categoria, 
//                 req.body.autor, req.body.nome, 
//                 req.body.descricao, 
//                 req.body.lancamento,
//                 req.file.path
//             ],
//             (error, resultado, field) => {
//                 conn.release(); // liberar conexao
//                 if(error) {return res.status(500).send({error: error})}

//                 res.status(201).send({
//                     mensagem: 'livro cadastrado',
//                     id_livro: resultado.insertId
//                 });
//             }
//         )
//     });

   
// });
