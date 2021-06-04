export class EmailProvider {
  send(notification, users) {
    const emails = users.map(user => user.email)
    console.log(`Sent ${notification.title} via Email to ${emails}`)
  }

  sendToTopic(notification, topic) {
    console.log(`Sent ${notification.title} via Email to topic: ${topic}`)
  }
}