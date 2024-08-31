import { Document } from 'mongoose';

export interface User extends Document {
  readonly guestId: string;
  readonly username: string;
}
