import { RateLimiter } from 'limiter'

const rate = process.env.FCM_PROVIDER_RATE || 10
const limiter = new RateLimiter({ tokensPerInterval: rate, interval: "second" })

export class FCMProvider {
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
    const tokens = users.map(user => user.token)
    console.log(`Sent ${notification.title} via FCM to ${tokens}`)
  }

  #sendToTopic(notification, topic) {
    console.log(`Sent ${notification.title} via FCM to topic: ${topic}`)
  }
}