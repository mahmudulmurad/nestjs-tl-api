import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from '../../dto/singup.dto';
import { LoginDto } from '../../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.userService.signUp(signUpDto);
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
      },
      {
        expiresIn: '1d',
      },
    );
    return { user, accessToken };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.userService.login(loginDto);
    } catch (error) {
      console.error('Error sending message to loggerService:', error);
    }
  }
}
