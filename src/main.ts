import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Serve Said');

  // app.use('/users/update-username', AuthMiddleware);
  // app.use('/products/create-product', AuthMiddleware);

  await app.listen(process.env.PORT);
  logger.log(`Server is running in port:${process.env.PORT}`);
}
bootstrap();
