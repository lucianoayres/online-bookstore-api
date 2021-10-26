import LivroRepository from '../repositories/livro.repository.js'
import VendaRepository from '../repositories/venda.repository.js'

// Livro services

async function createLivro(livro) {
  return await LivroRepository.createLivro(livro)
}

async function updateLivro(livro) {
  if (await getLivro(livro.livroId)) {
    return await LivroRepository.updateLivro(livro)
  }
  throw new Error('O livroId informado não existe.')
}

async function deleteLivro(id) {
  const vendas = await VendaRepository.getVendasByLivroId(id)
  if (vendas.length > 0) {
    throw new Error(
      'Não é possível excluir o livro porque ele tem vendas cadastradas.'
    )
  }
  return await LivroRepository.deleteLivro(id)
}

async function getLivros(autorId) {
  if (autorId) {
    return await LivroRepository.getLivrosByAutorId(autorId)
  }
  return await LivroRepository.getLivros()
}

async function getLivro(id) {
  const livroInfo = await LivroRepository.getLivroInfo(id)
  let livro = await LivroRepository.getLivro(id)
  livro.valor = parseFloat(livro.valor)
  if (livroInfo) {
    livro.info = livroInfo
  }
  return livro
}

// Livro Info services

async function createLivroInfo(livroInfo) {
  if (await getLivro(livroInfo.livroId)) {
    return await LivroRepository.createLivroInfo(livroInfo)
  }
  throw new Error('O livroId informado não existe.')
}

async function updateLivroInfo(livroInfo) {
  return await LivroRepository.updateLivroInfo(livroInfo)
}

async function deleteLivroInfo(id) {
  return await LivroRepository.deleteLivroInfo(id)
}

async function getLivroInfo(id) {
  return await LivroRepository.getLivroInfo(id)
}

// Avaliação (de Livros) services

async function createAvaliacao(avaliacao, livroId) {
  try {
    let livroInfo = await getLivroInfo(livroId)
    if (livroInfo) {
      livroInfo.avaliacoes.push(avaliacao)
      await updateLivroInfo(livroInfo)
    } else {
      throw new Error('O livroId informado não existe.')
    }
  } catch (err) {
    throw err
  }
}

async function deleteAvaliacao(livroId, index) {
  try {
    const livroInfo = await getLivroInfo(livroId)
    livroInfo.avaliacoes.splice(index, 1)
    await updateLivroInfo(livroInfo)
  } catch (err) {
    throw err
  }
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivro,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  getLivroInfo,
  createAvaliacao,
  deleteAvaliacao
}
