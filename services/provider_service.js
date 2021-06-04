import { SMSProvider } from '../providers/sms.js'
import { FCMProvider } from '../providers/fcm.js'
import { EmailProvider } from '../providers/email.js'

const Providers = {
  'sms': new SMSProvider,
  'fcm': new FCMProvider,
  'email': new EmailProvider
}

export default {
  getProvider(name) {
    const provider = Providers[name]
    if(!provider) {
      throw Error(`Provider ${name} Not Found`)
    }
    return provider
  },
}