import AutorRepository from '../repositories/autor.repository.js'
import LivroRepository from '../repositories/livro.repository.js'

async function createAutor(autor) {
  return await AutorRepository.createAutor(autor)
}

async function updateAutor(autor) {
  if (await getAutor(autor.autorId)) {
    return await AutorRepository.updateAutor(autor)
  }
  throw new Error('O autorId informado não existe.')
}

async function deleteAutor(id) {
  const livros = await LivroRepository.getLivrosByAutorId(id)
  if (livros.length > 0) {
    throw new Error(
      'Não é possível excluir o autor porque ele tem livros cadastrados.'
    )
  }
  return await AutorRepository.deleteAutor(id)
}

async function getAutores() {
  return await AutorRepository.getAutores()
}

async function getAutor(id) {
  return await AutorRepository.getAutor(id)
}

export default { createAutor, updateAutor, deleteAutor, getAutores, getAutor }
