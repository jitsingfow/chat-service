import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(guestId: string, username: string): Promise<User> {
    const newUser = new this.userModel({ guestId, username });
    return newUser.save();
  }

  async getUserById(guestId: string): Promise<User> {
    return this.userModel.findOne({ guestId }).exec();
  }

  // Add more methods as needed
}
