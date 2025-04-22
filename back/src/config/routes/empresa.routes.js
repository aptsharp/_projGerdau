const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller');

// Rota paginada
router.get('/paginado', empresaController.listarEmpresasPaginado);

// Outras rotas...
router.post('/', empresaController.criarEmpresa);
router.get('/', empresaController.listarEmpresas);
router.get('/:id', empresaController.buscarEmpresaPorId);
router.put('/:id', empresaController.atualizarEmpresa);
router.delete('/:id', empresaController.deletarEmpresa);
router.post('/vincular', empresaController.vincularFornecedor);

module.exports = router;
