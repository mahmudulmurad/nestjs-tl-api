import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'thatsWhatSheSaid', 
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

