import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConnection } from './database/connection';
import { UserModule } from './territories/user/user.module';
import { ProductModule } from './territories/product/product.module';
import { ReviewModule } from './territories/review/review.module';

@Module({
  imports: [dbConnection(), UserModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
