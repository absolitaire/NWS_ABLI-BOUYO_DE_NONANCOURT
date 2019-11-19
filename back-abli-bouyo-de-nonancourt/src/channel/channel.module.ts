import { Logger, Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelDao } from './dao/channel.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './schemas/channel.schema';
import { MessageSchema } from './schemas/message.schema';
import { UserDao } from '../user/dao/user.dao';
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [ MongooseModule.forFeature([ { name: 'Channel', schema: ChannelSchema } ]),
    MongooseModule.forFeature([ { name: 'Message', schema: MessageSchema } ,
    ]),
    MongooseModule.forFeature([ { name: 'User', schema: UserSchema } ]) ],
  controllers: [ChannelController],
  providers: [ChannelService, Logger, ChannelDao, UserDao],
})
export class ChannelModule {}
