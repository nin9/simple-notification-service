import ProviderService from './provider_service.js'
import User from '../models/user.js'

export class SingleMessageService {
  async send(notification) {
    notification.providers.forEach(async (providerName) => {
      const provider = ProviderService.getProvider(providerName)
      const users = await this.getUsers(notification.consumers)
      provider.send(notification, users)
    })
  }

  async getUsers(ids) {
    const users = await User.find({ _id: { $in: ids } }).exec()
    if (!users) {
      console.log('Users not found')
      return []
    }
    return users
  }
}
