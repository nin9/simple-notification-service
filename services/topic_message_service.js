import ProviderService from './provider_service.js'

export class TopicMessageService {
  send(notification) {
    notification.providers.forEach(provider => {
      ProviderService.getProvider(provider).send(notification, notification.consumers)
    })
  }
}
