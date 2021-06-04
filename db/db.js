import mongoose from 'mongoose'
import database from '../config/database.js'

export class Database {
  async connect() {
    await mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to mongo')
  }

  close() {
    mongoose.connection.close()
  }
}