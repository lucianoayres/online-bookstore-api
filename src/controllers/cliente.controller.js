import ClienteService from '../services/cliente.service.js'
import { getRole } from '../controllers/auth.controller.js'

async function createCliente(req, res, next) {
  try {
    let cliente = req.body

    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        'Nome, email, senha, telefone e endereço são obrigatórios.'
      )
    }

    cliente = await ClienteService.createCliente(cliente)
    res.status(201).send(cliente)
  } catch (err) {
    next(err)
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body

    if (
      !cliente.clienteId ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        'ID do cliente, nome, email, senha, telefone e endereço são obrigatórios.'
      )
    }

    if (getRole(req.auth.user) === 'cliente') {
      const cli = await ClienteService.getClienteByEmail(req.auth.user)
      if (parseInt(cli.clienteId) !== cliente.clienteId) {
        throw new Error('Cliente não pode atualizar dados de outro cliente.')
      }
    }

    cliente = await ClienteService.updateCliente(cliente)
    res.status(200).send(cliente)
  } catch (err) {
    next(err)
  }
}

async function deleteCliente(req, res, next) {
  try {
    const clienteId = req.params.id
    await ClienteService.deleteCliente(clienteId)
    res.end()
  } catch (err) {
    next(err)
  }
}

async function getClientes(req, res, next) {
  try {
    const clientes = await ClienteService.getClientes()
    res.status(200).send(clientes)
  } catch (err) {
    next(err)
  }
}

async function getCliente(req, res, next) {
  try {
    const clienteId = req.params.id
    const cliente = await ClienteService.getCliente(clienteId)
    res.status(200).send(cliente)
  } catch (err) {
    next(err)
  }
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getCliente
}
