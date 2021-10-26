import Livro from '../models/livro.model.js'
import Venda from '../models/venda.model.js'

async function createVenda(venda) {
  try {
    return await Venda.create(venda)
  } catch (err) {
    throw err
  }
}

async function getVendas() {
  try {
    return await Venda.findAll()
  } catch (err) {
    throw err
  }
}

async function getVenda(id) {
  try {
    return await Venda.findByPk(id)
  } catch (err) {
    throw err
  }
}

async function getVendasByClienteId(id) {
  try {
    return await Venda.findAll({
      where: {
        clienteId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getVendasByLivroId(id) {
  try {
    return await Venda.findAll({
      where: {
        livroId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getVendasByAutorId(id) {
  try {
    return await Venda.findAll({
      include: {
        model: Livro,
        attributes: [],
        where: {
          autorId: id
        }
      },
      raw: true
    })
  } catch (err) {
    throw err
  }
}

export default {
  createVenda,
  getVendas,
  getVenda,
  getVendasByClienteId,
  getVendasByLivroId,
  getVendasByAutorId
}
