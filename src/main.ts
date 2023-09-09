import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import 'reflect-metadata';

async function bootstrap() {
  /*const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
          port: 3033,
        }
      }
  )
  await app.listen();*/
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  const logger = new Logger('NEST SERVER');
  logger.log(`Server is running in port:${process.env.PORT}`);
}
bootstrap();
