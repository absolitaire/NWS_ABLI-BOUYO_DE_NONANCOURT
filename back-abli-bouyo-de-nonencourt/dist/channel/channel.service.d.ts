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
    constructor(_channelDao: ChannelDao, _userDao: UserDao);
    findAll(): Observable<ChannelEntity[] | void>;
    findOne(id: string): Observable<ChannelEntity>;
    findMessagesOnChannel(params: FindMessagesDto): Observable<MessageEntity[] | void>;
    create(channel: CreateChannelDto): Observable<ChannelEntity>;
    private _addChannel;
    delete(id: string): Observable<void>;
    subscribe(sub: SubscriptionDto): Observable<ChannelEntity>;
    unsubscribe(sub: SubscriptionDto): Observable<ChannelEntity>;
    writeIntoChannel(message: CreateMessageDto): Observable<ChannelEntity>;
    tryToWriteIntoChannel(message: CreateMessageDto): Observable<ChannelEntity>;
}
