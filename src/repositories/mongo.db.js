import mongoose from 'mongoose'

async function connect() {
  const URI = process.env.MONGODB_URI

  return await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

export { connect }
