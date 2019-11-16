import { Logger, Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelDao } from './dao/channel.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './schemas/channel.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Channel', schema: ChannelSchema } ]) ],
  controllers: [ChannelController],
  providers: [ChannelService, Logger, ChannelDao],
})
export class ChannelModule {}
