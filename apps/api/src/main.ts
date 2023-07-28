import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
