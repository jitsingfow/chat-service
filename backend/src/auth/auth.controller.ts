import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    const user = await this.authService.registerUser(
      body.email,
      hashedPassword,
    );
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard) // Use JwtAuthGuard to protect this route
  getProtectedResource() {
    return {
      message: 'This route is protected and only accessible with a valid JWT.',
    };
  }
}
