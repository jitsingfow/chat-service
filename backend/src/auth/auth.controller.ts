import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    await this.authService.registerUser(body.email, body.password);
    return {
      message: 'User registered successfully.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  getProtectedResource() {
    return {
      message: 'This route is protected and only accessible with a valid JWT.',
    };
  }
}
