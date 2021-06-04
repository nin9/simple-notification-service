import amqplib from 'amqplib'
import rabbitmq from '../config/rabbitmq.js'
import NotificationService from '../services/notification_service.js'

export class Consumer {
  async connect() {
    const amqbClient = await amqplib.connect(`amqp://${rabbitmq.host}:5672`)
    const channel = await amqbClient.createChannel()
    await channel.assertQueue(rabbitmq.queue, { durable: false })
    console.log('Connected to rabbitmq')

    await channel.consume(rabbitmq.queue, function (message) {
      const content = message.content.toString()
      const msg = JSON.parse(content)
      console.log(`Received ${content}`)
      NotificationService.process(msg)
      channel.ack(message)
    })
  }
}
