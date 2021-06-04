export class FCMProvider {
  send(notification, users) {
    const tokens = users.map(user => user.token)
    console.log(`Sent ${notification.title} via FCM to ${tokens}`)
  }

  sendToTopic(notification, topic) {
    console.log(`Sent ${notification.title} via FCM to topic: ${topic}`)
  }
}