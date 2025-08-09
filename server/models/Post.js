import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  createdBy: { type: String, required: true }, // stores AuthDB user id
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
