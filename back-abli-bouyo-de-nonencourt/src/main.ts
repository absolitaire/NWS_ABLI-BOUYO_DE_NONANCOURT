import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AppConfig } from './interfaces/app-config.interface';
import * as Config from 'config';

async function bootstrap(config: AppConfig) {
  const app = await NestFactory.create(AppModule,
    new FastifyAdapter({logger: true}));

  // launch server
  await app.listen(config.port, config.host);
  Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');

}
bootstrap(Config.get<AppConfig>('server'));
