const express = require('express');
const router = express.Router();

const CategoriasController = require('../controllers/categorias-controller');

router.get('/', CategoriasController.getCategorias); // categorias

module.exports = router; // exportando modulo router

