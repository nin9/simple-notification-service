import Notification from '../models/notification.js'
import { SingleMessageService } from './single_message_service.js'
import { TopicMessageService } from './topic_message_service.js'

const MessageTypes = {
  'single': new SingleMessageService,
  'topic': new TopicMessageService
}

export default {
  async process(msg) {
    const notification = await Notification.findOne({ _id: msg.id }).exec()
    if (!notification){
      console.log('Notifications not found')
      return
    }

    const messageService = MessageTypes[notification.type]
    if(!messageService) {
      throw Error(`Type ${notification.type} Not Found`)
    }
    messageService.send(notification)
  }
}

