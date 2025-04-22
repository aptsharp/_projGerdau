const request = require('supertest');
const app = require('../app');

describe('API /api/empresas', () => {

  it('✅ deve cadastrar uma nova empresa com sucesso', async () => {
    const empresa = {
      cnpj: '12345678000' + Math.floor(Math.random() * 900 + 100),
      nomeFantasia: 'Empresa Testada',
      cep: '01310930'
    };

    const res = await request(app).post('/api/empresas').send(empresa);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('❌ não deve permitir CNPJ duplicado', async () => {
    const empresa = {
      cnpj: '12345678000100',
      nomeFantasia: 'Duplicada',
      cep: '01310930'
    };

    await request(app).post('/api/empresas').send(empresa); // 1ª vez
    const res = await request(app).post('/api/empresas').send(empresa); // 2ª vez

    expect(res.status).toBe(400);
    expect(res.body.erro).toMatch(/já existe/i);
  });

  it('❌ não deve cadastrar empresa com CEP inválido', async () => {
    const empresa = {
      cnpj: '12345678000999',
      nomeFantasia: 'CEP Inválido Ltda',
      cep: '00000000'
    };

    const res = await request(app).post('/api/empresas').send(empresa);
    expect(res.status).toBe(400);
    expect(res.body.erro).toMatch(/CEP inválido/i);
  });

});
