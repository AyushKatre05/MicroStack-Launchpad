import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.'],
    minLength: [2, 'Name must be 2 character long.'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  avtar: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: 'User',
  },
  password_reset_token: {
    type: String,
    required: false,
    trim: true,
  },
  magic_link_token: {
    type: String,
    required: false,
    trim: true,
  },
  magic_link_sent_at: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);


