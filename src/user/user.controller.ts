import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/singup.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.userService.signUp(signUpDto);
    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return { user, token };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
