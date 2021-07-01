import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    token: { type: String, required: true },
    language: { type: String, required: true}
  },
  {
    timestamps:
    {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
)
export default mongoose.model('User', UserSchema)
