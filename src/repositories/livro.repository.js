import Livro from '../models/livro.model.js'
import LivroInfoSchema from '../schemas/livroInfo.schema.js'
import { connect } from './mongo.db.js'

async function createLivro(livro) {
  try {
    return await Livro.create(livro)
  } catch (err) {
    throw err
  }
}

async function updateLivro(livro) {
  try {
    const result = await Livro.update(livro, {
      where: {
        livroId: livro.livroId
      },
      returning: true,
      plain: true
    })
    return result[1]
  } catch (err) {
    throw err
  }
}

async function deleteLivro(id) {
  try {
    await Livro.destroy({
      where: {
        livroId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getLivros() {
  try {
    return await Livro.findAll()
  } catch (err) {
    throw err
  }
}

async function getLivro(id) {
  try {
    return await Livro.findByPk(id, {
      raw: true
    })
  } catch (err) {
    throw err
  }
}

async function getLivrosByAutorId(id) {
  try {
    return await Livro.findAll({
      where: {
        autorId: id
      }
    })
  } catch (err) {
    throw err
  }
}

// Livro Info repositories

async function createLivroInfo(livroInfo) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema)
    livroInfo = new LivroInfo(livroInfo)
    await livroInfo.save()
  } catch (err) {
    throw err
  }
}

async function updateLivroInfo(livroInfo) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema)
    await LivroInfo.findOneAndUpdate({ livroId: livroInfo.livroId }, livroInfo)
  } catch (err) {
    throw err
  }
}

async function deleteLivroInfo(livroId) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema)
    await LivroInfo.deleteOne({ livroId })
  } catch (err) {
    throw err
  }
}

async function getLivroInfo(livroId) {
  try {
    const mongoose = await connect()
    const LivroInfo = mongoose.model('LivroInfo', LivroInfoSchema)
    return await LivroInfo.findOne({ livroId })
  } catch (err) {
    throw err
  }
}

async function deleteAvaliacao(index) {
  try {
    return false
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
  getLivrosByAutorId,
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  getLivroInfo
}
