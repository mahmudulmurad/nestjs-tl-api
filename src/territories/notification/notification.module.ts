import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Notification } from '../../entities';
import { NotificationService } from './notification.service';
import { jwtConstants } from '../../auth/secret';
import { NotificationController } from './notification.controller';
import { ResponseService } from 'src/service/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ResponseService],
})
export class NotificationModule {}
