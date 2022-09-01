import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';

const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys:['nghi']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // just show specfic fields that define in Entity
    })
  )
  await app.listen(3000);
}
bootstrap();
