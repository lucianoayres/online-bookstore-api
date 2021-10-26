import ClienteRepository from '../repositories/cliente.repository.js'
import VendaRepository from '../repositories/venda.repository.js'
import basicAuth from 'express-basic-auth'

async function createCliente(cliente) {
  return await ClienteRepository.createCliente(cliente)
}

async function updateCliente(cliente) {
  if (await getCliente(cliente.clienteId)) {
    return await ClienteRepository.updateCliente(cliente)
  }
  throw new Error('O clienteId informado não existe.')
}

async function deleteCliente(id) {
  const vendas = await VendaRepository.getVendasByClienteId(id)
  if (vendas.length > 0) {
    throw new Error(
      'Não é possível excluir o cliente porque ele tem vendas cadastradas.'
    )
  }
  return await ClienteRepository.deleteCliente(id)
}

async function getClientes() {
  return await ClienteRepository.getClientes()
}

async function getCliente(id) {
  return await ClienteRepository.getCliente(id)
}

async function verificaLogin(email, senha) {
  const cliente = await ClienteRepository.getClienteByEmail(email)

  if (!cliente) {
    return false
  }
  return basicAuth.safeCompare(cliente.senha, senha)
}

async function getClienteByEmail(email) {
  return await ClienteRepository.getClienteByEmail(email)
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getCliente,
  verificaLogin,
  getClienteByEmail
}
