import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Serve Said');
  await app.listen(process.env.PORT);
  logger.log(`Server is running in port:${process.env.PORT}`);
}
bootstrap();
