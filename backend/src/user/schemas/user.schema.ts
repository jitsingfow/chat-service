import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: true },
});
