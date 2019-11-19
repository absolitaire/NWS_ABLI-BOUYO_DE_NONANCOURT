import { Logger } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Observable } from 'rxjs';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelEntity } from './entities/channel.entity';
import { HandlerParams } from './validators/handler-params';
import { SubscriptionDto } from './dto/subscription.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';
import { FindMessagesQuery } from './validators/find-messages-query';
export declare class ChannelController {
    private readonly _channelService;
    private readonly _logger;
    constructor(_channelService: ChannelService, _logger: Logger);
    findAll(): Observable<ChannelEntity[] | void>;
    findOne(params: HandlerParams): Observable<ChannelEntity>;
    findSubscribedChannelsOfUser(params: HandlerParams): Observable<ChannelEntity[] | void>;
    findMessagesFromChannel(query: FindMessagesQuery): Observable<MessageEntity[] | void>;
    create(createChannelDto: CreateChannelDto): Observable<ChannelEntity>;
    subscribeAccountToChannel(sub: SubscriptionDto): Observable<ChannelEntity>;
    unsubscribeAccountToChannel(sub: SubscriptionDto): Observable<ChannelEntity>;
    writeIntoChannel(message: CreateMessageDto): Observable<ChannelEntity>;
}
