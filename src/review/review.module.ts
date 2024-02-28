import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ProductReview } from '../entities';
import { ReviewService } from './review.service';
import { jwtConstants } from '../auth/secret';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReviewController } from './review.controller';
import { ResponseService } from 'src/service/response.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3110,
        },
      },
    ]),
    TypeOrmModule.forFeature([ProductReview]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ResponseService],
})
export class ReviewModule {}
