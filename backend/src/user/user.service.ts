import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    // TODO: check if user already exists
    // TODO: hash password

    // check if user already exists
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    const newUser = new this.userModel({
      email,
      password,
    });
    return newUser.save();
  }

  async loginUser(email: string, password: string): Promise<any> {
    console.log('Login user:', email);

    // TODO: hash password
    // TODO: check if password is correct
    // TODO: check if user exists
    // TODO: return auth token

    // check if user exists
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // check if password is correct
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    // return auth token
    return { email: user.email, token: 'auth-token' };
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
