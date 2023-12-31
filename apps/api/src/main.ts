import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from '@/app.exception.filter';

const morgan = require('morgan');
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();

  app.use(cookieParser());
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AppExceptionFilter(httpAdapter));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
