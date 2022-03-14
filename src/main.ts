import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sendEmail } from './utils/sendEmail';

async function bootstrap() {
  // sendEmail('bob@bob.com', 'hello there');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000).then();
}
bootstrap();
