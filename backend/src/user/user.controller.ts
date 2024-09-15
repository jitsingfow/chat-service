import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get user by email passed in the query params
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
}
