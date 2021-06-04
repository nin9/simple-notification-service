import { Database } from './db.js'
import Notification from '../models/notification.js'
import User from '../models/user.js'

const db = new Database()
await db.connect()

await Notification.deleteMany()
await User.deleteMany()

console.log('Running seeds...')

const user = await User.create({
  email: 'email@example.com',
  mobile: '+111111111111',
  token: 'token'
})

await Notification.create({
  title: 'Notification #1',
  body: 'Hello World',
  type: 'single',
  providers: ['fcm', 'sms', 'email'],
  consumers: [user.id],
})

await Notification.create({
  title: 'Notification #2',
  body: 'Hello World',
  type: 'topic',
  providers: ['fcm', 'sms', 'email'],
  consumers: ['topic_1'],
})

console.log('Done')

db.close()
