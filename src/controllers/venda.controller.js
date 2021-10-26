import VendaService from '../services/venda.service.js'
import ClienteService from '../services/cliente.service.js'
import { getRole } from '../controllers/auth.controller.js'

async function createVenda(req, res, next) {
  try {
    let venda = req.body

    if (!venda.data || !venda.livroId || !venda.clienteId) {
      throw new Error('Data, ID do livro e ID do cliente são obrigatórios.')
    }
    venda = await VendaService.createVenda(venda)
    res.status(201).send(venda)
  } catch (err) {
    next(err)
  }
}

async function getVendas(req, res, next) {
  try {
    const livroId = req.query.livroId
    const autorId = req.query.autorId
    const clienteId = req.query.clienteId

    if (getRole(req.auth.user) === 'cliente') {
      const cli = await ClienteService.getClienteByEmail(req.auth.user)
      if (parseInt(clienteId) !== cli.clienteId) {
        throw new Error('Cliente não pode consultar vendas de outro cliente.')
      }
    }

    const vendas = await VendaService.getVendas(livroId, autorId, clienteId)

    res.status(200).send(vendas)
  } catch (err) {
    next(err)
  }
}

async function getVenda(req, res, next) {
  try {
    const vendaId = req.params.id
    const venda = await VendaService.getVenda(vendaId)
    res.status(200).send(venda)
  } catch (err) {
    next(err)
  }
}

export default {
  createVenda,
  getVendas,
  getVenda
}
