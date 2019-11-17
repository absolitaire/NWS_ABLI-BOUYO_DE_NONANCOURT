import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';
import * as Config from 'config';

@Module({
  // imports: [ MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/back', Config.get<MongooseModuleOptions>('mongodb.options')),
   ChannelModule, UserModule],
})
export class AppModule {}
