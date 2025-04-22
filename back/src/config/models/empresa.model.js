const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
  cnpj: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nomeFantasia: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
    required: true,
  },
  fornecedores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fornecedor',
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Empresa', EmpresaSchema);
