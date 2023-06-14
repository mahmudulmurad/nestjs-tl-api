import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('NEST SERVER');
  await app.listen(process.env.PORT);
  logger.log(`Server is running in port:${process.env.PORT}`);
}
bootstrap();
