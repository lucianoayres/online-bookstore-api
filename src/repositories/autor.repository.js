import Autor from '../models/autor.model.js'

async function createAutor(autor) {
  try {
    return await Autor.create(autor)
  } catch (err) {
    throw err
  }
}

async function updateAutor(autor) {
  try {
    const result = await Autor.update(autor, {
      where: {
        autorId: autor.autorId
      },
      returning: true,
      plain: true
    })
    return result[1]
    //return await getAutor(autor.autorId)
  } catch (err) {
    throw err
  }
}

async function deleteAutor(id) {
  try {
    await Autor.destroy({
      where: {
        autorId: id
      }
    })
  } catch (err) {
    throw err
  }
}

async function getAutores() {
  try {
    return await Autor.findAll()
  } catch (err) {
    throw err
  }
}

async function getAutor(id) {
  try {
    return await Autor.findByPk(id)
  } catch (err) {
    throw err
  }
}

export default { createAutor, updateAutor, deleteAutor, getAutores, getAutor }
