import app from './app.js'

const PORT = 3000

const server = app.listen(PORT, () =>
  console.log(`API Started on Port: ${PORT}`)
)
