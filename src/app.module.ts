import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {dbConnection} from './database/connection'
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    dbConnection(),
    UserModule,
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
