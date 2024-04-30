import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Notification, User } from '../../entities';
import { NotificationService } from './notification.service';
import { jwtConstants } from '../../auth/secret';
import { NotificationController } from './notification.controller';
import { ResponseService } from 'src/service/response.service';
import { QueryBuilderService } from 'src/service/queryBuilder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ResponseService, QueryBuilderService],
})
export class NotificationModule {}
