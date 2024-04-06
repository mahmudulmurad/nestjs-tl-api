import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest API Docs')
    .setDescription('API stories from @mahmudulmurad')
    .setVersion('1.0')
    .addTag('san-Ti')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  const logger = new Logger('NEST SERVER');
  logger.log(`Server is running in port:${process.env.PORT} 🔥🚀🚀🚀🔥`);
}

bootstrap();
