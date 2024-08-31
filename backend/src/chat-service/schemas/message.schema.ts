import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  sender: String,
  receiver: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});
