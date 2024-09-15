import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    console.log('Get user details by email: ', email);
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    };
  }

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users.map((user) => ({
      id: user._id,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    }));
  }
}
