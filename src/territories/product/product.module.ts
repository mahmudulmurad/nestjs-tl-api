import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, User } from '../../entities';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../auth/secret';
import { ResponseService } from 'src/service/response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ResponseService],
})
export class ProductModule {}
