import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './interfaces/message.interface';
import { UserService } from '../user/user.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class ChatServiceService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  async sendMessage(
    sender: string,
    receiver: string,
    content: string,
  ): Promise<Message> {
    const senderUser = await this.userService.getUserById(sender);
    const receiverUser = await this.userService.getUserById(receiver);

    if (!senderUser || !receiverUser) {
      throw new Error('Sender or receiver not found');
    }

    const newMessage = new this.messageModel({ sender, receiver, content });
    await newMessage.save();

    const message = JSON.stringify({ sender, receiver, content });
    await this.redisService.publisher.publish('chat_channel', message);

    // log the message to the console
    console.log(`Message sent: ${message}`);
    return newMessage;
  }

  async subscribeToMessages(callback: (message: any) => void): Promise<void> {
    const subscriber = this.redisService.subscriber; // Use a separate client for subscribing

    try {
      await subscriber.subscribe('chat_channel');
    } catch (err) {
      console.error('Failed to subscribe to Redis channel:', err);
      throw new Error('Failed to subscribe to Redis channel');
    }

    subscriber.on('message', (channel, message) => {
      try {
        callback(JSON.parse(message));
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    });

    subscriber.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }
  async getMessages(sender: string, receiver: string): Promise<Message[]> {
    return this.messageModel.find({ sender, receiver }).exec();
  }
}
