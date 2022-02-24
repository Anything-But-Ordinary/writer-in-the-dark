import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto) {
    return dto;
  }

  @Post('login')
  async login(@Body() dto) {
    return dto;
  }
}
