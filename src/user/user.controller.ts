import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from '../dto/singup.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
