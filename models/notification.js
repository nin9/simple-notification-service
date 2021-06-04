import mongoose from 'mongoose'
const { Schema } = mongoose

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: { type: String, enum: ['single', 'topic'], required: true },
    providers: { type: Array, required: true }, //e.g fcm, apn,sms, email ..etc.
    consumers: { type: Array, required: true } // Array of user ids or topics.
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
)
export default mongoose.model('Notification', NotificationSchema)
