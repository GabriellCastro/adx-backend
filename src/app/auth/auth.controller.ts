import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { AuthResponse } from './dto/auth-response.dto';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from '../../common/decorators/auth-user.decorator';
import { CreateUserDto } from './dto/register-user.dto';
import { Users } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(createUserDto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@AuthUser() user: Users): Users {
    return user;
  }
}
