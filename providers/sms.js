import { RateLimiter } from 'limiter'

const rate = process.env.SMS_PROVIDER_RATE || 10
const limiter = new RateLimiter({ tokensPerInterval: rate, interval: "second" })

export class SMSProvider {
  async send(notification, consumers) {
    if (notification.type == 'single'){
      await limiter.removeTokens(1)
      this.#sendToUsers(notification, consumers)
    }
    else{
      await limiter.removeTokens(1)
      this.#sendToTopic(notification, consumers)
    }
  }

  #sendToUsers(notification, users) {
    const phoneNumbers = users.map(user => user.mobile)
    console.log(`Sent ${notification.title} via SMS to ${phoneNumbers}`)
  }

  #sendToTopic(notification, topic) {
    console.log(`Sent ${notification.title} via SMS to topic: ${topic}`)
  }
}