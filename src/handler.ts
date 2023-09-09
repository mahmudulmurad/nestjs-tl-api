const serverless = require('serverless-http');
const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/main');

const app = express();

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, app);
  nestApp.enableCors();
  await nestApp.init();
}

bootstrap();

module.exports.handler = serverless(app);
