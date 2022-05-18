import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import AppModule from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: [{ path: '/', method: RequestMethod.GET }] });
  await app.listen(3000);
}
bootstrap();
