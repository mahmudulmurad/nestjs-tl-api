import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '../entities';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/secret';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    JwtModule.register({
      secret:jwtConstants.secret, 
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
