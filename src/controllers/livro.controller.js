import LivroService from '../services/livro.service.js'

// Livro controllers

async function createLivro(req, res, next) {
  try {
    let livro = req.body

    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autorId) {
      throw new Error('Nome, valor, estoque e ID do autor são obrigatórios.')
    }

    livro = await LivroService.createLivro(livro)
    res.status(201).send(livro)
  } catch (err) {
    next(err)
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body

    if (
      !livro.livroId ||
      livro.nome ||
      !livro.valor ||
      livro.estoque ||
      livro.autorId
    ) {
      throw new Error(
        'ID do livro e valor são obrigatórios. Valor é o único campo permitido para atualização.'
      )
    }

    livro = await LivroService.updateLivro(livro)
    res.status(200).send(livro)
  } catch (err) {
    next(err)
  }
}

async function deleteLivro(req, res, next) {
  try {
    const livroId = req.params.id
    await LivroService.deleteLivro(livroId)
    res.end()
  } catch (err) {
    next(err)
  }
}

async function getLivros(req, res, next) {
  try {
    const autorId = req.query.autorId
    const livros = await LivroService.getLivros(autorId)
    res.status(200).send(livros)
  } catch (err) {
    next(err)
  }
}

async function getLivro(req, res, next) {
  try {
    const livroId = req.params.id
    const livro = await LivroService.getLivro(livroId)
    res.status(200).send(livro)
  } catch (err) {
    next(err)
  }
}

// Livro Info controllers

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body

    if (
      !livroInfo.livroId ||
      !livroInfo.descricao ||
      !livroInfo.paginas ||
      !livroInfo.editora
    ) {
      throw new Error(
        'ID do livro, descrição, páginas e editora são obrigatórios.'
      )
    }

    livroInfo = await LivroService.createLivroInfo(livroInfo)
    res.status(201).send(livroInfo)
  } catch (err) {
    next(err)
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body

    if (!livroInfo.livroId) {
      throw new Error('ID do livro é obrigatório.')
    }

    livroInfo = await LivroService.updateLivroInfo(livroInfo)
    res.end()
  } catch (err) {
    next(err)
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    const livroId = req.params.id
    await LivroService.deleteLivroInfo(livroId)
    res.end()
  } catch (err) {
    next(err)
  }
}

// Avaliação (de Livros) controllers

async function createAvaliacao(req, res, next) {
  try {
    let avaliacao = req.body
    const livroId = req.params.livroId

    if (!avaliacao.nome || !avaliacao.nota || !avaliacao.avaliacao) {
      throw new Error('Nome do cliente, note e avaliação são obrigatórios.')
    }

    avaliacao = await LivroService.createAvaliacao(avaliacao, livroId)
    res.status(201).send(avaliacao)
  } catch (err) {
    next(err)
  }
}

async function deleteAvaliacao(req, res, next) {
  try {
    const livroId = req.params.livroId
    const index = req.params.index

    await LivroService.deleteAvaliacao(livroId, index)
    res.end()
  } catch (err) {
    next(err)
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
  createAvaliacao,
  deleteAvaliacao
}
