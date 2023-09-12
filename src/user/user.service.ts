import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities';
import { SignUpDto } from '../dto/singup.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ExcelJS = require('exceljs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject('LOGGER_SERVICE') private loggerService: ClientProxy,
  ) {}

  hello() {
    return this.loggerService.send({ cmd: 'user' }, `murad`);
  }

  async userDataImport(): Promise<User[]> {
    try {
      const workbook = new ExcelJS.Workbook();
      const excelFile = 'data/MOCK_DATA.xlsx';
      await workbook.xlsx.readFile(excelFile);

      const worksheet = workbook.getWorksheet(1);
      const promises: Promise<User>[] = [];

      worksheet.eachRow(
        { includeEmpty: false },
        async (row: any[], rowNumber: number) => {
          if (rowNumber > 1) {
            const data = row.values;
            const rowUserName = data['1'];
            try {
              const isExist = await this.userRepository.findOne({
                where: { username: rowUserName },
              });
              if (!isExist) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data['2'], salt);
                const newUser = this.userRepository.create({
                  username: data['2'],
                  password: hashedPassword,
                });
                newUser.id = uuidv4();
                promises.push(this.userRepository.save(newUser));
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }
        },
      );

      await Promise.all(promises).then((res) => {
        console.log(res);
      });

      const allUsers = await this.userRepository.find();
      return allUsers;
    } catch (error) {
      console.error('Error reading or importing data:', error);
      throw error;
    }
  }

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
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('Invalid username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    const accessToken = await this.jwtService.signAsync(
      { username: user.username, id: user.id },
      {
        expiresIn: '1d',
      },
    );
    this.hello();
    return { accessToken };
  }
}
