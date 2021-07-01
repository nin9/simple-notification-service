import { RateLimiter } from 'limiter'
import i18n from 'i18n'

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
    console.log(`Sent ${i18n.__({phrase: notification.body, locale: users[0].language})} via FCM to ${tokens}`)
  }

  #sendToTopic(notification, topic) {
    console.log(`Sent ${notification.body} via FCM to topic: ${topic}`)
  }
}