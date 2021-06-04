export class SMSProvider {
  send(notification, users) {
    const phoneNumbers = users.map(user => user.mobile)
    console.log(`Sent ${notification.title} via SMS to ${phoneNumbers}`)
  }

  sendToTopic(notification, topic) {
    console.log(`Sent ${notification.title} via SMS to topic: ${topic}`)
  }
}