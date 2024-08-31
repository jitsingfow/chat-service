import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() body: { guestId: string; username: string }) {
    return this.userService.createUser(body.guestId, body.username);
  }

  @Get(':guestId')
  async getUserById(@Param('guestId') guestId: string) {
    return this.userService.getUserById(guestId);
  }

  // Add more routes as needed
}
