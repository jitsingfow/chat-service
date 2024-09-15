import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get user by email passed in the query params
  @Get()
  getUserByEmail(@Param('email') email: string) {
    console.log('Get user details by email: ', email);
    return this.userService.findByEmail(email);
  }
}
