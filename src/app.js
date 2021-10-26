import express from 'express'
import { check, param, validationResult } from 'express-validator'
import cors from 'cors'

import clientesRouter from './routes/cliente.route.js'
import autoresRouter from './routes/autor.route.js'
import livrosRouter from './routes/livro.route.js'
import vendasRouter from './routes/venda.route.js'

import basicAuth from 'express-basic-auth'
import { authorizer, authorize } from './controllers/auth.controller.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  res.status(200).send('Livraria Online API')
})

// all endpoints after this setting will locked under basic auth
app.use(basicAuth({ authorizeAsync: true, authorizer }))

app.use('/cliente', clientesRouter)
app.use('/autor', authorize('admin'), autoresRouter)
app.use('/livro', livrosRouter)
app.use('/venda', vendasRouter)

app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message })
})

export default app
