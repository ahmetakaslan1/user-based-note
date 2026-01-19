import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // KAPI AÇIK (Herkes girebilir)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: RegisterDto) {
  
    return this.authService.register(registerDto);
  }

  @Public() //  KAPI AÇIK (Herkes girebilir)
  @Post('login')
  @ApiOperation({ summary: 'Login with credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Oluşturduğumuz @Public Decoratorünü koymadığımız için
  // kilitli! (Token lazım)
  @Get('profile')
  @ApiBearerAuth() //  Swagger'da kilit simgesi çıkartır ekelem
  @ApiOperation({ summary: 'Get current user profile (Protected)' })
  async getProfile(@CurrentUser() user: User) {
 
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
