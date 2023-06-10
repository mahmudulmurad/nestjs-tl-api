import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '../entities';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    JwtModule.register({
      secret: 'thatsWhatSheSaid', 
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
// export class ProductModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes('*');
//   }
// }
