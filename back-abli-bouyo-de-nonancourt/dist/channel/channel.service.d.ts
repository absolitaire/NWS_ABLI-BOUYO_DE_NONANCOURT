import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChannelEntity } from './entities/channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelDao } from './dao/channel.dao';
import { SubscriptionDto } from './dto/subscription.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserDao } from '../user/dao/user.dao';
import { MessageEntity } from './entities/message.entity';
import { FindMessagesDto } from './dto/find-messages.dto';
export declare class ChannelService {
    private readonly _channelDao;
    private readonly _userDao;
    private readonly _logger;
    constructor(_channelDao: ChannelDao, _userDao: UserDao, _logger: Logger);
    findAll(): Observable<ChannelEntity[] | void>;
    findOne(id: string): Observable<ChannelEntity>;
    findMessagesOnChannel(params: FindMessagesDto): Promise<MessageEntity[] | void>;
    create(channel: CreateChannelDto): Observable<ChannelEntity>;
    private _addChannel;
    delete(id: string): Observable<void>;
    tryToSubscribe(sub: SubscriptionDto): Observable<ChannelEntity>;
    subscribe(sub: SubscriptionDto): Observable<ChannelEntity>;
    unsubscribe(sub: SubscriptionDto): Observable<ChannelEntity>;
    writeIntoChannel(message: CreateMessageDto): Observable<ChannelEntity>;
    tryToWriteIntoChannel(message: CreateMessageDto): Observable<ChannelEntity>;
}
