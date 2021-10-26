import Cliente from '../models/cliente.model.js'

async function createCliente(cliente) {
  try {
    return await Cliente.create(cliente)
  } catch (err) {
    throw err
  }
}

async function updateCliente(cliente) {
  try {
    const result = await Cliente.update(cliente, {
      where: {
        clienteId: cliente.clienteId
      },
      returning: true,
      plain: true
    })
    return result[1]
  } catch (err) {
    throw err
  }
}

async function deleteCliente(id) {
  try {
    await Cliente.destroy({
      where: {
        clienteId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getClientes() {
  try {
    return await Cliente.findAll({ attributes: { exclude: ['senha'] } })
  } catch (err) {
    throw err
  }
}

async function getCliente(id) {
  try {
    return await Cliente.findByPk(id, { attributes: { exclude: ['senha'] } })
  } catch (err) {
    throw err
  }
}

async function getClienteByEmail(email) {
  try {
    const result = await Cliente.findOne({
      where: {
        email
      },
      raw: true
    })
    return result
  } catch (err) {
    throw err
  }
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getCliente,
  getClienteByEmail
}
