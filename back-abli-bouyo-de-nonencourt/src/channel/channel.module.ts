import { Logger, Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelDao } from './dao/channel.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema, UserIdSchema } from './schemas/channel.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Channel', schema: ChannelSchema } ]),
    MongooseModule.forFeature([ { name: 'UserId', schema: UserIdSchema } ])],
  controllers: [ChannelController],
  providers: [ChannelService, Logger, ChannelDao],
})
export class ChannelModule {}
