import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../src/app.js'

const adminUser = 'admin'
const adminPassword = 'desafio-igti-nodejs'

const clienteUser = 'ggconceicao@gmail.com'
const clientePassword = 'MRalkmBOJq'

describe('Cenário 01: Testes de Integração', () => {
  /*
  // montagem
  beforeEach(async () => {
    // insert code here
  })

  // desmontagem
  afterAll(async () => {
    //inser code here
  })
  */

  let autorId = null
  let livroId = null
  let livroObj = null
  let clienteId = null
  let clienteLogin = null
  let clienteSenha = null

  jest.setTimeout(300000)
  test('Teste 1: Servidor na porta 3000', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
  })

  test('Teste 2: Criar um novo autor válido e verificar se ele foi criado corretamente no banco de dados', async () => {
    // Premissas
    const payloadValid = {
      nome: 'Clarice Lispector',
      email: 'clarisse@gmail.com',
      telefone: '218888-5544'
    }

    // Operação
    const res = await request(app)
      .post('/autor')
      .auth(adminUser, adminPassword)
      .send(payloadValid)

    // Resultado ou Comportamento Esperado
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(201)
    expect(res.body).toMatchSnapshot(payloadValid)
    payloadValid.autorId = autorId = res.body.autorId
    expect(res.body).toMatchObject(payloadValid)
  })

  test('Teste 3: Criar um novo livro válido com dados de teste para o autor criado no teste anterior e verificar se o livro foi criado corretamente', async () => {
    // Premissas
    const payloadValid = {
      nome: 'Serveless Node.js',
      valor: 245.99,
      estoque: 125,
      autorId: autorId
    }

    // Operação
    const res = await request(app)
      .post('/livro')
      .auth(adminUser, adminPassword)
      .send(payloadValid)

    // Resultado ou Comportamento Esperado
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(201)
    expect(res.body).toMatchSnapshot(payloadValid)
    livroObj = res.body
    payloadValid.livroId = livroId = res.body.livroId
    expect(res.body).toMatchObject(payloadValid)
  })

  test('Teste 4: Criar um novo cliente válido com dados de teste e verificar se ele foi criado corretamente', async () => {
    // Premissas
    const payloadValid = {
      nome: 'Jack Blues',
      email: 'jblues@gmail.com',
      senha: 'passpass2021',
      telefone: '819999-8877',
      endereco: 'Rua Gomes da Costa, 892'
    }

    // Operação
    const res = await request(app)
      .post('/cliente')
      .auth(adminUser, adminPassword)
      .send(payloadValid)

    // Resultado ou Comportamento Esperado
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(201)
    expect(res.body).toMatchSnapshot(payloadValid)
    payloadValid.clienteId = clienteId = res.body.clienteId
    clienteLogin = res.body.email
    clienteSenha = res.body.senha
    expect(res.body).toMatchObject(payloadValid)
  })

  test('Teste 5: Buscar o livro criado no teste anterior utilizando dados de login do usário criado no teste anterior e verificar se o retorno é adequado.', async () => {
    jest.setTimeout(100000000)
    // Premissas
    const responseValid = {
      livroId: livroObj.livroId,
      nome: livroObj.nome,
      autorId: livroObj.autorId,
      valor: livroObj.valor,
      estoque: livroObj.estoque
    }
    // Operação
    const res = await request(app)
      .get(`/livro/${livroObj.livroId}`)
      .auth(clienteLogin, clienteSenha)

    // Resultado ou Comportamento Esperado
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(200)

    expect(res.body).toMatchSnapshot(responseValid)
    expect(res.body).toMatchObject(responseValid)
  })

  test('Teste 6: Criar uma venda para o usuário e o livro criados nos testes anteriores e verificar se a venda foi salva corretamente', async () => {
    // Premissas
    const payloadValid = {
      valor: livroObj.valor,
      data: '2021-07-21',
      clienteId: clienteId,
      livroId: livroId
    }
    // Operação
    const res = await request(app)
      .post('/venda')
      .auth(clienteLogin, clienteSenha)
      .send(payloadValid)

    // Resultado ou Comportamento Esperado
    expect(res.body.erro).toBeUndefined()
    expect(res.status).toBe(201)
    //res.body.valor = parseFloat(res.body.valor)
    expect(res.body).toMatchSnapshot(payloadValid)
    payloadValid.vendaId = res.body.vendaId
    expect(res.body).toMatchObject(payloadValid)
  })
})
