import express from 'express'
import LivroController from '../controllers/livro.controller.js'
import { authorize } from '../controllers/auth.controller.js'

const router = express.Router()

// Livro routes
router.post('/', authorize('admin'), LivroController.createLivro)
router.put('/', authorize('admin'), LivroController.updateLivro)
router.delete('/:id', authorize('admin'), LivroController.deleteLivro)
router.get('/', authorize('admin', 'cliente'), LivroController.getLivros)
router.get('/:id', authorize('admin', 'cliente'), LivroController.getLivro)

// Livro Info routes
router.post('/info', authorize('admin'), LivroController.createLivroInfo)
router.put('/info', authorize('admin'), LivroController.updateLivroInfo)
router.delete('/info/:id', authorize('admin'), LivroController.deleteLivroInfo)

// Avaliações (de Livros) routes
router.post(
  '/:livroId/avaliacao',
  authorize('admin', 'cliente'),
  LivroController.createAvaliacao
)
router.delete(
  '/:livroId/avaliacao/:index',
  authorize('admin'),
  LivroController.deleteAvaliacao
)

export default router
