const express = require('express');
const router = express.Router();


const AutorController = require('../controllers/autor-controller');

router.get('/', AutorController.getAutor);
router.get('/:id_autor', AutorController.getAutorById);
router.get('/perfil/:id_autor', AutorController.getAutorPerfil);
router.post('/cadastro', AutorController.cadastroAutor);
router.post('/file', AutorController.upload.single('file'), AutorController.postArquivo);
router.post('/login', AutorController.Login);

module.exports = router;