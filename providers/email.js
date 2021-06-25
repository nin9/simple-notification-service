import { RateLimiter } from 'limiter'

const rate = process.env.EMAIL_PROVIDER_RATE || 10
const limiter = new RateLimiter({ tokensPerInterval: rate, interval: "second" })

export class EmailProvider {

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
    const emails = users.map(user => user.email)
    console.log(`Sent ${notification.title} via Email to ${emails}`)
  }

  #sendToTopic(notification, topic) {
    console.log(`Sent ${notification.title} via Email to topic: ${topic}`)
  }
}