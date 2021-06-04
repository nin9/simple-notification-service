import amqplib from 'amqplib'
import rabbitmq from '../config/rabbitmq.js'

export class Consumer {
  async connect() {
    const amqbClient = await amqplib.connect(`amqp://${rabbitmq.host}:5672`)
    const channel = await amqbClient.createChannel()
    await channel.assertQueue(rabbitmq.queue, { durable: false })
    console.log('Connected to rabbitmq')

    await channel.consume(rabbitmq.queue, function (msg) {
      console.log(msg.content.toString())
      channel.ack(msg)
    })
  }
}
