import { Document } from 'mongoose';

export interface Message extends Document {
  readonly sender: string;
  readonly receiver: string;
  readonly content: string;
  readonly timestamp: Date;
}
