const mongoose = require('mongoose');

const FornecedorSchema = new mongoose.Schema({
  tipoPessoa: {
    type: String,
    enum: ['FISICA', 'JURIDICA'],
    required: true
  },
  cnpjCpf: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  rg: {
    type: String,
    required: function() {
      return this.tipoPessoa === 'FISICA';
    }
  },
  dataNascimento: {
    type: Date,
    required: function() {
      return this.tipoPessoa === 'FISICA';
    }
  },
  empresas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Empresa'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Fornecedor', FornecedorSchema);
