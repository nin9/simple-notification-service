import { Consumer } from './consumer/consumer.js'
import { Database } from './db/db.js'

const db = new Database()
db.connect()

const consumer = new Consumer()
consumer.connect()
