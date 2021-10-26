import VendaRepository from '../repositories/venda.repository.js'
import LivroRepository from '../repositories/livro.repository.js'
import ClienteRepository from '../repositories/cliente.repository.js'

async function createVenda(venda) {
  const livro = await LivroRepository.getLivro(venda.livroId)
  const cliente = await ClienteRepository.getCliente(venda.clienteId)

  if (livro && cliente && livro.estoque > 0) {
    livro.estoque--
    LivroRepository.updateLivro(livro)
    venda.valor = livro.valor
    return await VendaRepository.createVenda(venda)
  }

  if (!livro) {
    throw new Error('O livroId informado não existe.')
  }

  if (!cliente) {
    throw new Error('O clienteId informado não existe.')
  }

  if (livro.estoque == 0) {
    throw new Error('O livro selecionado está sem estoque.')
  }
}

async function getVendas(livroId, autorId, clienteId) {
  if (livroId) {
    return await VendaRepository.getVendasByLivroId(livroId)
  }
  if (autorId) {
    return await VendaRepository.getVendasByAutorId(autorId)
  }
  if (clienteId) {
    return await VendaRepository.getVendasByClienteId(clienteId)
  }
  return await VendaRepository.getVendas()
}

async function getVenda(id) {
  return await VendaRepository.getVenda(id)
}

export default {
  createVenda,
  getVendas,
  getVenda
}
