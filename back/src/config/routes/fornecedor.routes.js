const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedor.controller');

router.post('/', fornecedorController.criarFornecedor);
router.get('/', fornecedorController.listarFornecedores);
router.get('/:id', fornecedorController.buscarFornecedorPorId);
router.put('/:id', fornecedorController.atualizarFornecedor);
router.delete('/:id', fornecedorController.deletarFornecedor);

module.exports = router;
