import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
