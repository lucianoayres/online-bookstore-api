import express from 'express'
import VendaController from '../controllers/venda.controller.js'
import { authorize } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/', authorize('admin', 'cliente'), VendaController.createVenda)
router.get('/:id', authorize('admin'), VendaController.getVenda)
router.get('/', authorize('admin', 'cliente'), VendaController.getVendas)

export default router
