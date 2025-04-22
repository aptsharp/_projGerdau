const request = require('supertest');
const app = require('../app'); // ou '../app' se estiver fora de config

describe('API /api/fornecedores', () => {

  it('✅ deve cadastrar fornecedor PJ com sucesso', async () => {
    const fornecedor = {
      cnpjCpf: '123456780001' + Math.floor(Math.random() * 90 + 10),
      nome: 'Fornecedor PJ',
      email: 'pj@teste.com',
      cep: '01310930'
    };

    const res = await request(app).post('/api/fornecedores').send(fornecedor);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('✅ deve cadastrar fornecedor PF com sucesso', async () => {
    const fornecedor = {
      cnpjCpf: '123456789' + Math.floor(Math.random() * 90 + 10), // 11 dígitos
      nome: 'Fornecedor PF',
      email: 'pf@teste.com',
      cep: '01310930',
      rg: '123456789',
      dataNascimento: '1999-01-01'
    };

    const res = await request(app).post('/api/fornecedores').send(fornecedor);
    expect(res.status).toBe(201);
    expect(res.body.tipoPessoa).toBe('FISICA');
  });

  it('❌ não deve permitir CPF/CNPJ duplicado', async () => {
    const fornecedor = {
      cnpjCpf: '12345678900',
      nome: 'Duplicado',
      email: 'dup@teste.com',
      cep: '01310930',
      rg: '11223344',
      dataNascimento: '2000-01-01'
    };

    await request(app).post('/api/fornecedores').send(fornecedor);
    const res = await request(app).post('/api/fornecedores').send(fornecedor);

    expect(res.status).toBe(400);
    expect(res.body.erro).toMatch(/já existe/i);
  });

  it('❌ não deve permitir CEP inválido', async () => {
    const fornecedor = {
      cnpjCpf: '12345678977',
      nome: 'CEP Fail',
      email: 'cep@fail.com',
      cep: '00000000',
      rg: '55667788',
      dataNascimento: '1995-01-01'
    };

    const res = await request(app).post('/api/fornecedores').send(fornecedor);
    expect(res.status).toBe(400);
    expect(res.body.erro).toMatch(/CEP inválido/i);
  });

  it('❌ não deve permitir PF menor de idade com empresa do PR', async () => {
    // Cria empresa com CEP do Paraná (curitiba)
    const empresaPR = {
      cnpj: '123456780009' + Math.floor(Math.random() * 90 + 10),
      nomeFantasia: 'Empresa PR',
      cep: '80010000'
    };

    const empresaRes = await request(app)
      .post('/api/empresas')
      .send(empresaPR);

    const fornecedor = {
      cnpjCpf: '123456789' + Math.floor(Math.random() * 90 + 10), // CPF válido
      nome: 'Menor de idade',
      email: 'menor@teste.com',
      cep: '01310930',
      rg: '000111222',
      dataNascimento: '2015-01-01', // menor de idade
      empresas: [empresaRes.body._id] // deve ser array
    };

    console.log("🧪 TESTE menor de idade:", fornecedor);

    const res = await request(app)
      .post('/api/fornecedores')
      .send(fornecedor);

    console.log('🧪 RESPOSTA:', res.body);

    expect(res.status).toBe(400);
    expect(res.body.erro).toMatch(/menor de idade.*Paraná/i);
  });

});
