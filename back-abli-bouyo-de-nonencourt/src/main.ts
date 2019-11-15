import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AppConfig } from './interfaces/app-config.interface';
import * as Config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './interfaces/swagger-config.interface';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create(AppModule,
    new FastifyAdapter({logger: true}));

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const swaggerDocument = SwaggerModule.createDocument(app, options, {
    include: [ ChannelModule, UserModule], //
  });

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, swaggerDocument);

  // launch server
  await app.listen(config.port, config.host);
  Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');

}
bootstrap(Config.get<AppConfig>('server'), Config.get<SwaggerConfig>('swagger'));
