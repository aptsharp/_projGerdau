const Fornecedor = require("../models/fornecedor.model");
const { buscarCep } = require("../services/cep.service");

// Criar fornecedor
const criarFornecedor = async (req, res) => {
  try {
    const input = req.body.cnpjCpf.replace(/\D/g, "");
    if (input.length === 11) {
      req.body.tipoPessoa = "FISICA";
    } else if (input.length === 14) {
      req.body.tipoPessoa = "JURIDICA";
    } else {
      return res
        .status(400)
        .json({ erro: "CPF ou CNPJ inválido. Deve conter 11 ou 14 dígitos." });
    }

    const cepInfo = await buscarCep(req.body.cep);
    if (!cepInfo) {
      return res.status(400).json({ erro: "CEP inválido!" });
    }

    // Se for pessoa física, verificar idade e empresa associada (Paraná)
    if (req.body.tipoPessoa === "FISICA") {
      const nascimento = new Date(req.body.dataNascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();

      // Verifica se o fornecedor é menor de idade
      const menorDeIdade =
        idade < 18 ||
        (idade === 18 &&
          hoje < new Date(nascimento.setFullYear(nascimento.getFullYear() + 18)));

      // Verifica se está tentando associar a uma empresa do PR
      if (menorDeIdade && req.body.empresas?.length > 0) {
        const Empresa = require("../models/empresa.model");

        // Garante que 'empresas' seja sempre um array
        let empresas = req.body.empresas;
        if (typeof empresas === "string") {
          empresas = [empresas];
        }

        for (const empresaId of empresas) {
          const empresa = await Empresa.findById(empresaId);
          if (empresa) {
            const empresaCep = await buscarCep(empresa.cep);
            console.log(`🌍 CEP ${empresa.cep} retornou UF: ${empresaCep?.uf}`);
            console.log("🔍 Verificando empresa:", empresa.nomeFantasia, "UF:", empresaCep?.uf);

            if (!empresaCep) {
              console.log('❌ Falha ao buscar CEP da empresa vinculada!');
            }

            if (empresaCep?.uf === "PR") {
              return res.status(400).json({
                erro: "Fornecedor menor de idade não pode ser associado a empresa do Paraná",
              });
            }
          }
        }
      }
    }

    // Criar e salvar fornecedor no banco
    console.log("✅ Nenhuma restrição encontrada, salvando fornecedor...");
    const fornecedor = await Fornecedor.create(req.body);
    res.status(201).json(fornecedor);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ erro: "Já existe um fornecedor com este CPF/CNPJ" });
    }

    res.status(400).json({ erro: error.message });
  }
};

// Listar todos
const listarFornecedores = async (req, res) => {
  try {
    const fornecedores = await Fornecedor.find().populate("empresas");
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Buscar por ID
const buscarFornecedorPorId = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findById(req.params.id).populate("empresas");
    if (!fornecedor)
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    res.status(200).json(fornecedor);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar
const atualizarFornecedor = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!fornecedor)
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    res.status(200).json(fornecedor);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Deletar
const deletarFornecedor = async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);
    if (!fornecedor)
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  criarFornecedor,
  listarFornecedores,
  buscarFornecedorPorId,
  atualizarFornecedor,
  deletarFornecedor,
};
