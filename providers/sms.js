import { RateLimiter } from 'limiter'
import i18n from 'i18n'

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
    console.log(`Sent ${i18n.__({phrase: notification.body, locale: users[0].language})} via SMS to ${phoneNumbers}`)
  }

  #sendToTopic(notification, topic) {
    console.log(`Sent ${notification.body} via SMS to topic: ${topic}`)
  }
}