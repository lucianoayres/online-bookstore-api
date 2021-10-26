import mongoose from 'mongoose'

async function connect() {
  const URI =
    'mongodb+srv://admin:admin2021@desafiofinaldev.nhlie.mongodb.net/desafiofinaldev'

  return await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

export { connect }
