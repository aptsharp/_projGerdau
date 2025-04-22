const Empresa = require('../models/empresa.model');
const Fornecedor = require('../models/fornecedor.model');
const { buscarCep } = require('../services/cep.service');


// 📌 Criar nova empresa
const criarEmpresa = async (req, res) => {
  try {
    const empresaExistente = await Empresa.findOne({ cnpj: req.body.cnpj });
    if (empresaExistente) {
      return res.status(400).json({ erro: 'Já existe uma empresa com este CNPJ' });
    }

    const cepValido = await buscarCep(req.body.cep);
    if (!cepValido) {
      return res.status(400).json({ erro: 'CEP inválido!' });
    }

    const empresa = await Empresa.create(req.body);
    res.status(201).json(empresa);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};


// 📌 Listar todas as empresas (sem paginação)
const listarEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.find().populate('fornecedores');
    res.status(200).json(empresas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// 📌 Listar empresas com paginação e ordenação alfabética
const listarEmpresasPaginado = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const empresas = await Empresa.find()
      .sort({ nomeFantasia: 1 }) // ordem alfabética
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('fornecedores');

    const total = await Empresa.countDocuments();

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      empresas
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// 📌 Buscar empresa por ID
const buscarEmpresaPorId = async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id).populate('fornecedores');
    if (!empresa) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// 📌 Atualizar empresa
const atualizarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empresa) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }
    res.status(200).json(empresa);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};


// 📌 Deletar empresa
const deletarEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// 📌 Vincular fornecedor (por CNPJ e CPF/CNPJ)
const vincularFornecedor = async (req, res) => {
  const { cnpjEmpresa, cnpjCpfFornecedor } = req.body;

  try {
    const empresa = await Empresa.findOne({ cnpj: cnpjEmpresa });
    const fornecedor = await Fornecedor.findOne({ cnpjCpf: cnpjCpfFornecedor });

    if (!empresa || !fornecedor) {
      return res.status(404).json({ erro: 'Empresa ou Fornecedor não encontrados' });
    }

    if (!empresa.fornecedores.includes(fornecedor._id)) {
      empresa.fornecedores.push(fornecedor._id);
      await empresa.save();
    }

    if (!fornecedor.empresas.includes(empresa._id)) {
      fornecedor.empresas.push(empresa._id);
      await fornecedor.save();
    }

    res.status(200).json({ mensagem: 'Fornecedor vinculado com sucesso via CNPJ/CPF!' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};


// ✅ Exports
module.exports = {
  criarEmpresa,
  listarEmpresas,
  listarEmpresasPaginado,
  buscarEmpresaPorId,
  atualizarEmpresa,
  deletarEmpresa,
  vincularFornecedor
};
