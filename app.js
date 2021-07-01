import { Consumer } from './consumer/consumer.js'
import { Database } from './db/db.js'
import i18n from 'i18n'
import path from 'path'

const db = new Database()
db.connect()

const consumer = new Consumer()
consumer.connect()

const __dirname = path.resolve()
i18n.configure({
  locales: ['en', 'ar'],
  directory: __dirname + '/locales'
})