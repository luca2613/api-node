const express = require('express');
const router = express.Router();
const multer = require('multer');

const AutorController = require('../controllers/autor-controller');

const storage = multer.diskStorage({
    destination: function(req, file, callBack) {
        callBack(null, './uploads')
    },
    filename:  function(req, file, callBack) {
        callBack(null, new Date().toISOString() + file.originalname);
    },
})

const upload = multer({storage: storage});

router.post('/cadastro', AutorController.cadastroAutor);
router.post('/login', AutorController.Login);

module.exports = router;