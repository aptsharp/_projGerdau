const axios = require('axios');

const buscarCep = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, '');

  if (!cepLimpo || cepLimpo.length !== 8) {
    return null;
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);

    if (response.data.erro) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar CEP:', error.message);
    return null;
  }
};

module.exports = { buscarCep };
