import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  guestId: { type: String, unique: true, required: true },
  username: { type: String, required: true },
});
