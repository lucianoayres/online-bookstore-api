import Autor from '../models/autor.model.js'
import AutorService from '../services/autor.service.js'

async function createAutor(req, res, next) {
  try {
    let autor = req.body

    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error('Nome, email e telefone são obrigatórios.')
    }

    autor = await AutorService.createAutor(autor)
    res.status(201).send(autor)
  } catch (err) {
    next(err)
  }
}

async function updateAutor(req, res, next) {
  try {
    let autor = req.body

    if (!autor.autorId || !autor.nome || !autor.email || !autor.telefone) {
      throw new Error('ID do autor, nome, email e telefone são obrigatórios.')
    }
    autor = await AutorService.updateAutor(autor)
    res.status(200).send(autor)
  } catch (err) {
    next(err)
  }
}

async function deleteAutor(req, res, next) {
  try {
    const autorId = req.params.id
    await AutorService.deleteAutor(autorId)
    res.end()
  } catch (err) {
    next(err)
  }
}

async function getAutores(req, res, next) {
  try {
    const autores = await AutorService.getAutores()
    res.status(200).send(autores)
  } catch (err) {
    next(err)
  }
}

async function getAutor(req, res, next) {
  try {
    const autorId = req.params.id
    const autor = await AutorService.getAutor(autorId)
    res.status(200).send(autor)
  } catch (err) {
    next(err)
  }
}

export default { createAutor, updateAutor, deleteAutor, getAutores, getAutor }
