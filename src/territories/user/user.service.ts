import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities';
import { SignUpDto } from '../../dto/singup.dto';
import { LoginDto } from '../../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { username, password } = signUpDto;
    const isExist = await this.userRepository.findOne({ where: { username } });
    if (isExist) {
      throw new ConflictException(
        'Username is already taken. Please choose a different username.',
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    newUser.id = uuidv4();
    return await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      if (!user) {
        throw new NotFoundException('Invalid username');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      const accessToken = await this.jwtService.signAsync(
        { username: user.username, id: user.id },
        {
          expiresIn: '1d',
        },
      );
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException('Error during login');
    }
  }
}
